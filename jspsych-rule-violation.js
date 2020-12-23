/*
 * Example plugin template
 */

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
        description: 'Turn On and Off Bonus for fast and correct movement.'
      },
      min_BonusTime: {
        type: jsPsych.plugins.parameterType.NUM,
        pretty_name: 'Min Bonus Time',
        default: 0 ,
        description: 'Time limit for Bonus.'
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
      Aim_pos: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Aim_pos',
        default: 'center',
        description: 'Position of Aim'
      },
      block_height: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Block height',
        default: window.innerHeight/4,
        description: 'The height of the Block.'
      },
      block_width: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Block width',
        default: window.innerwidth/3,
        description: 'The width of the block.'
      },
      Symbol: {
        type: jsPsych.plugins.parameterType.COMPLEX, // 
        array: true,
        pretty_name: 'Symbol',
        description: 'The Object indicating, indicating the Aim.'
      },
      blockade: {
        type: jsPsych.plugins.parameterType.COMPLEX, // This is similar to the quesions of the survey-likert. 
        array: false,
        pretty_name: 'Blockade',
        description: 'The objects will be presented in the canvas.',
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
    const police= (Math.floor(Math.random() * 100) < 15) //15% probability for police
    var trespass=false

    var mouse_position = []
    let IT;
    let MT;
    let correct_reaction;
    let start_time;
    var points = 0 ;
    var cw=canvas.width
    var ch=canvas.height
    var min_BonusTime = trial.min_BonusTime
    trial.block_height = cch*420
    trial.block_width = ccw*420
    
    

    var rect_start = {
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
      BlposX=centerX+ccw*100
    }
    else if (trial.BlposX == 'left') {
      BlposX=centerX - (ccw*100+trial.block_width)
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
    Police.src= "img/Police.png"
    
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
      if (isInside(mousePos,rect_start)) {
      show_stimulus();
      canvas.removeEventListener('click', start_button);
      canvas.addEventListener('mousemove', initiation_phase)
      }else{
      }   
      }

    function initiation_phase(evt) {
    var mousePos = getMousePos(canvas, evt);
    if (!isInside(mousePos,rect_start)) {
      canvas.removeEventListener('mousemove', initiation_phase)
      movement_phase()
      }else{
      }   
    } 


    function movement_phase() {
    IT = performance.now() - start_time
    ctx.clearRect(centerX-ccw*300, centerY-cch*200, ccw*600, cch*300);
    draw_blockade()
    canvas.addEventListener('click', finish_trial)
    canvas.addEventListener('mousemove',recordMousePosition)
    }

    function recordMousePosition(evt) {
      var mousePos = getMousePos(canvas, evt);
      mouse_position.push(mousePos)
      if (isInside(mousePos, block_rect)) {
        trespass =true
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
    ctx.fillText('+'+trial.time_Bonus+'!',cw/2,ch/2+rect_width)
        }
    

    function draw_stimulus() {
      if (trial.Aim_pos=='left') {
        ctx.drawImage(stim_1,rect_left.x,rect_left.y,rect_width,rect_width)
        ctx.drawImage(stim_2,rect_right.x,rect_right.y,rect_width,rect_width)
       } else if (trial.Aim_pos=='right') { 
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
        correct_reaction= trial.Aim_pos== 'left' 
        feedback()
        } else if (isInside(mousePos,rect_right)) {
          correct_reaction= trial.Aim_pos== 'right'
          feedback()
        }
        else {
        }   
    }

    function feedback(){
      MT= performance.now() - start_time - IT
        if (police && trespass) {
          points = - 20 
        } else if ((MT+IT) <min_BonusTime && correct_reaction)  {
          points=trial.time_Bonus
        }

      canvas.removeEventListener('mousemove',recordMousePosition)
      canvas.removeEventListener('click', feedback);  
      ctx.clearRect(0, rect_left.y + rect_width*2, cw, ch*0.6); 
      if (correct_reaction) {
        ctx.fillText('RICHTIG!',centerX,centerY)
        //ctx.fillText('Weiter mit Mausklick',cw/2,ch/2+20)
      } else {
        ctx.fillText('FALSCH!',centerX,centerY)
        //ctx.fillText('Weiter mit Mausklick',cw/2,ch/2+20)
      }
      setTimeout(feedback_points,500)
    }

    function feedback_points() {
      ctx.clearRect(0, rect_left.y + rect_width*2, cw, ch*0.6); 
      if (police && trespass) {
      ctx.drawImage(Police, centerX +-2*rect_width,centerY-5*rect_width,4*rect_width,4*rect_width)
      ctx.fillText('-20!',centerX,centerY)
      } else if ((MT+IT) <min_BonusTime && correct_reaction)  {
        ctx.drawImage(Star,centerX-1.5*rect_width,centerY-1.7*rect_width,3*rect_width,3*rect_width)
        ctx.fillText('+'+points+'!',centerX,centerY)
      } else {
        ctx.fillText('+0!',centerX,centerY)
      }
      setTimeout(end_trial,2000)
    }
  
    // end trial
    function end_trial() {
      canvas.removeEventListener('click', end_trial);   
      
        // data saving
    var trial_data = {
      mousePosition: mouse_position,
      IT: IT,
      MT: MT,
      start_time: start_time,
      correct_reaction: correct_reaction,
      Points: points,
      trespass: tresspass 
    };
      jsPsych.finishTrial(trial_data);
    }

  }

  return plugin;
})();
