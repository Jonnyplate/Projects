/* ##############################################################################
            Plugin for this rule breaking paradigm by Jonas Plate
############################################################################## */

jsPsych.plugins["rule-violation"] = (function() {

  var plugin = {};

  plugin.info = {
    name: "rule-violation",
    parameters: {
      words: {
        type: jsPsych.plugins.parameterType.STRING, // BOOL, STRING, INT, FLOAT, FUNCTION, KEYCODE, SELECT, HTML_STRING, IMAGE, AUDIO, VIDEO, OBJECT, COMPLEX
        default: undefined
      },
      canvas_width: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Canvas width',
        default: window.innerWidth*0.95,
        description: 'The width of the canvas.'
      },
      time_Bonus: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Time Bonus',
        default: 0 ,
        description: 'Turn On and Off Bonuspoints for fast and correct movement.' 
      },
      PointRTLimit: {
        type: jsPsych.plugins.parameterType.NUM,
        pretty_name: 'PointRTLimit',
        default: 0 ,
        description: 'Time limit for Bonus. If participants react faster than this limit, they receive points.' 
      },
      canvas_height: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Canvas height',
        default: window.innerHeight*0.95,
        description: 'The height of the canvas.'
      },
      BlposX: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'BlposX',
        default: 'center',
        description: 'The horizontal start position.'
      },
      Target_pos: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Target_pos',
        default: 'center',
        description: 'Position of target in the next trial'
      },
      block_height: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Block height',
        default: window.innerHeight/4,
        description: 'The height of the blockade.'
      },
      block_width: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Block width',
        default: window.innerwidth/3,
        description: 'The width of the blockade.'
      },
      Symbol: {
        type: jsPsych.plugins.parameterType.COMPLEX, 
        array: true,
        pretty_name: 'Symbol',
        description: 'The target stimuli.'
      },
      police: {
        type: jsPsych.plugins.parameterType.BOOL, 
        pretty_name: 'Police',
        default: false,
        description: 'Turns "police" on and off'
      },
      blockade: {
        type: jsPsych.plugins.parameterType.COMPLEX, // This is similar to the quesions of the survey-likert. 
        array: false,
        pretty_name: 'Blockade',
        description: 'The stimulus used for the blockade.',
        nested: {
          BlposY: {
            type: jsPsych.plugins.parameterType.STRING,
            pretty_name: 'BlposY',
            default: 'center',
            description: 'The vertical start position.'
          },
        }
      },
    }
  }

  plugin.trial = function(display_element, trial) {

  

    let new_html = '<canvas id="myCanvas" class="jspsych-canvas" width=' + trial.canvas_width + ' height=' + trial.canvas_height + ' style="background-color:' + '#fff' + ';"></canvas>';
    display_element.innerHTML = new_html;

    const canvas = document.getElementById('myCanvas');
    if ( ! canvas || ! canvas.getContext ) {
      alert('This browser does not support the canvas element.');
      return;
    }
    
    const ctx = canvas.getContext('2d');
    ctx.font = '20px Arial'; 
    ctx.textAlign='center';

    trial.canvas = canvas;
    trial.context = ctx;
    
    const cch=canvas.height/1000
    const ccw=cch/9*16
 

    // Center of canvas
    const centerX = canvas.width/2;
    const centerY = canvas.height/2;
    const rect_width= 40*ccw
    const police=trial.police  //15% probability for police
    
    var RuleBreak=false

    var mouse_position = {
      MouseX: [],
      MouseY: [],
      TrialTimeStamp:[]
    }
    let InitiationTime;
    let MovementTime;
    let ResponseCorrect;
    let start_time;
    let MouseStartX;
    let MouseStartY;
    let TargetLocationX;
    let TargetLocationY;
    let OppositeLocationX;
    let OppositeLocationY;
    let LocationMarkerXSize;
    let LocationMarkerYSize;
    let BlockadeLocationX;
    let BlockadeLocationY;
    let BlockadeXSize;
    let BlockadeYSize;
    let Canvasrect =canvas.getBoundingClientRect()

    var TrialPoints = 0 ;
    var cw=canvas.width
    var ch=canvas.height
    var PointRTLimit = trial.PointRTLimit
    trial.block_height = cch*420
    trial.block_width = ccw*420
    
  
    var rect_start = {                 // rectangles
      x:centerX-rect_width/2,
      y:ch-2*rect_width,
      width:rect_width,
      height:rect_width
   };
    var rect_left = {
      x:centerX-rect_width-ccw*450,
      y:rect_width,
      width:rect_width,
      height:rect_width
    } ;
    var rect_right = {
      x:centerX +ccw*450,
      y:rect_width,
      width:rect_width,
      height:rect_width
    };

    BlposY = centerY
    if (trial.BlposX == 'right') {
      BlposX=centerX+ccw*50
    }
    else if (trial.BlposX == 'left') {
      BlposX=centerX - (ccw*50+trial.block_width)
    } else {alert('Keine Blockadenposition')}

    var block_rect = {
      x:BlposX,
      y:BlposY - trial.block_height/2,
      width:trial.block_width,
      height:trial.block_height
    };

 

    canvas.addEventListener('click', start_button);

    // Blockade 
    block=trial.blockade
    block.img = new Image();
    block.img.src = trial.blockade.file
    
    Star= new Image()
    Star.src= "img/Star.png"
    Police= new Image()
    Police.src= "img/Police_2.png"
    Circle= new Image()
    Circle.src= "img/Circle.png"
    
    //Stimuli
    stimuli=trial.Symbol
    stimuli.img_1= new Image()
    stimuli.img_1.src =trial.Symbol[0]
    stimuli.img_2= new Image()
    stimuli.img_2.src =trial.Symbol[1]
    stim_1=stimuli.img_1
    stim_2=stimuli.img_2
    Start_canvas(ctx)
  
    // functions 

    function Start_canvas() {
      draw_reminder()
      setTimeout(draw_blockade,1000)
      setTimeout(draw_rects,1000)
    }

    function start_button(evt) {
      var mousePos = getMousePos(canvas, evt);
      MouseStartX = mousePos.x;
      MouseStartY = mousePos.y;
      if (isInside(mousePos,rect_start)) {
      show_stimulus();
      draw_rects()
      canvas.removeEventListener('click', start_button);
      canvas.addEventListener('mousemove', initiation_phase)
      }else{
      }   
      }

    function initiation_phase(evt) {
    var mousePos = getMousePos(canvas, evt);
    canvas.addEventListener('mousemove',recordMousePosition)
    if (!isInside(mousePos,rect_start)) {
      canvas.removeEventListener('mousemove', initiation_phase)
      movement_phase()
      }else{
      }   
    } 


    function movement_phase() {
    ctx.clearRect(centerX-ccw*300, centerY-cch*200, ccw*600, cch*300);
    draw_blockade()
    }

    
    function recordMousePosition(evt) {
      var mousePos = getMousePos(canvas, evt);
      mouse_position.MouseX.push(mousePos.x)
      mouse_position.MouseY.push(mousePos.y)
      mouse_position.TrialTimeStamp.push(evt.timeStamp - start_time)
    
     if (Math.abs(mousePos.x-mouse_position.MouseX[0])+Math.abs(mousePos.y-mouse_position.MouseY[0]) <=30) {
      InitiationTime = performance.now() - start_time
     }
     
  
      //if () {InitiationTime = performance.now() - start_time}
      
      if (isInside(mousePos, block_rect)) {
        RuleBreak =true
      }
      if (isInside(mousePos,rect_left)) {
        ResponseCorrect= trial.Target_pos== 'left'
        feedback()
        } else if (isInside(mousePos,rect_right)) {
          ResponseCorrect= trial.Target_pos== 'right'
          feedback()
        }
        else {
        }   
    
    }

    function getMousePos(canvas, event) {
      var rect = canvas.getBoundingClientRect();
      return {
          x: event.clientX - rect.left,
          y: event.clientY - rect.top
      };
    }
  
    function isInside(pos, rect){
      return pos.x > rect.x && pos.x < rect.x+rect.width && pos.y < rect.y+rect.height && pos.y > rect.y
    }
    
    function draw_rects() {
      ctx.strokeRect(rect_start.x,rect_start.y,rect_start.width,rect_start.height);
      ctx.strokeRect(rect_left.x,rect_left.y,rect_left.width,rect_left.height);
      ctx.strokeRect(rect_right.x,rect_right.y,rect_right.width,rect_right.height); 
    }

    function draw_blockade() {
      var width=block_rect.width
      var height=block_rect.height
      ctx.drawImage(block.img,block_rect.x,block_rect.y,width,height);
    }

    function draw_reminder() {
    ctx.drawImage(stim_1,cw/2-rect_width/2,ch/2-rect_width/2,rect_width,rect_width)
    ctx.fillText('+'+trial.time_Bonus,cw/2,ch/2+rect_width)
        }
    

    function draw_stimulus() {
      if (trial.Target_pos=='left') {
        ctx.drawImage(stim_1,rect_left.x,rect_left.y,rect_width,rect_width)
        ctx.drawImage(stim_2,rect_right.x,rect_right.y,rect_width,rect_width)
       } else if (trial.Target_pos=='right') { 
         ctx.drawImage(stim_1,rect_right.x,rect_right.y,rect_width,rect_width)
         ctx.drawImage(stim_2,rect_left.x,rect_left.y,rect_width,rect_width)
      } else {alert('Kein Stimulus ausgewaehlt')}
    }

    function show_stimulus() {
      ctx.clearRect(centerX-ccw*300, centerY-cch*200, ccw*600, cch*300);
      draw_stimulus();
      draw_blockade();
      start_time =  performance.now();
    }
   
    function finish_trial(evt) {
      var mousePos = getMousePos(canvas, evt);
      if (isInside(mousePos,rect_left)) {
        ResponseCorrect= trial.Target_pos== 'left' 
        feedback()
        } else if (isInside(mousePos,rect_right)) {
          ResponseCorrect= trial.Target_pos== 'right'
          feedback()
        }
        else {
        }   
    }

    function feedback(){
      MovementTime= performance.now() - start_time - InitiationTime
        if (police && RuleBreak) {
          TrialPoints = - 20 
        } else if ((MovementTime+InitiationTime) <PointRTLimit && ResponseCorrect)  {
          TrialPoints=trial.time_Bonus
        }

      canvas.removeEventListener('mousemove',recordMousePosition)
      canvas.removeEventListener('click', feedback);  
      ctx.clearRect(0, rect_left.y + rect_width*2, cw, ch*0.6); 
      if (ResponseCorrect) {
        ctx.fillStyle = "green"
        ctx.fillText('RICHTIG!',centerX,centerY)
        //ctx.fillText('Weiter mit Mausklick',cw/2,ch/2+20)
      } else {
        ctx.fillStyle = "red"
        ctx.fillText('FALSCH!',centerX,centerY)
        //ctx.fillText('Weiter mit Mausklick',cw/2,ch/2+20)
      }
      setTimeout(feedback_points,500)
    }

    function feedback_points() {
      ctx.clearRect(0, rect_left.y + rect_width*2, cw, ch*0.6); 
      ctx.font = '30px Arial'; 
      ctx.fillStyle = "black"
      if (police && RuleBreak) {
        ctx.drawImage(Police, centerX +-2*rect_width,centerY-3.4*rect_width,4*rect_width,4*rect_width)
        ctx.fillStyle = "red"
        ctx.fillText('-'+'20'+'!',centerX,centerY)
      } else if (((MovementTime+InitiationTime)<PointRTLimit) && ResponseCorrect)  {
        ctx.drawImage(Star,centerX-1.5*rect_width,centerY-1.85*rect_width,3.2*rect_width,3.2*rect_width)
        ctx.fillText('+'+TrialPoints+'!',centerX,centerY)
      } else {
        ctx.drawImage(Circle,centerX-1.5*rect_width,centerY-1.7*rect_width,3*rect_width,3*rect_width)
        ctx.fillText('+'+TrialPoints+'!',centerX,centerY)
      }
      setTimeout(end_trial,500)  // hier feedbackzeit einstellen 
    }
  
    // end trial
    function end_trial() {
      canvas.removeEventListener('click', end_trial);   
      
      TargetLocationY=rect_left.y
      OppositeLocationY =rect_right.y
      BlockadeLocationX= block_rect.x
      BlockadeLocationY= block_rect.y
      BlockadeXSize=block_rect.width
      BlockadeYSize=block_rect.height

      if (trial.Target_pos=="left") {
      var TargetLocation=1
      TargetLocationX = rect_left.x
      OppositeLocationX =rect_right.x  

      } else {
        var TargetLocation=2
        TargetLocationX = rect_right.x
        OppositeLocationX =rect_left.x
       }

      if (trial.BlposX=="left") {
        var BlockadePosition=1
       
      } else {
        var BlockadePosition=2 }
      
       if (ResponseCorrect) {
         var Feedback="richtig!"
       } else {Feedback="falsch!"}
        // data saving
    var trial_data = {
      InitiationTime: InitiationTime,
      MovementTime: MovementTime,
      TotalTime: InitiationTime + MovementTime, 
      start_time: start_time,
      PointRTLimit: PointRTLimit,
      ResponseCorrect: ResponseCorrect,
      Feedback:Feedback,
      TrialPoints: TrialPoints,
      RuleBreak: RuleBreak,
      PoliceCatch: police && RuleBreak,
      ConformityCritical: trial.Target_pos == trial.BlposX,
      PointAdvantage: trial.time_Bonus,
      TargetLocation: TargetLocation,
      BlockadePosition: BlockadePosition,
      MouseStartX: MouseStartX,
      MouseStartY:MouseStartY,
      MouseEndX:mouse_position.MouseX[mouse_position.MouseX.length-1],
      MouseEndY:mouse_position.MouseY[mouse_position.MouseY.length-1],
      ScreenXMax: canvas.width,
      ScreenYMax: canvas.height,
      StartLocationX: rect_start.x,
      StartLocationY: rect_start.y,
      TargetLocationX:TargetLocationX,
      TargetLocationY:TargetLocationY,
      OppositeLocationX: OppositeLocationX,
      OppositeLocationY: OppositeLocationY,
      LocationMarkerXSize: rect_width,
      LocationMarkerYSize:rect_width,
      BlockadeLocationX:BlockadeLocationX,
      BlockadeLocationY:BlockadeLocationY,
      BlockadeXSize:BlockadeXSize,
      BlockadeYSize:BlockadeYSize,
      MouseX: mouse_position.MouseX,
      MouseY: mouse_position.MouseY,
      TrialTimeStamp: mouse_position.TrialTimeStamp,
  
    };
      jsPsych.finishTrial(trial_data);
    }

  }

  return plugin;
})();

/*
Credit:        Jonas Plate, 
Contributor:   Salomé Li Keintzel
*/