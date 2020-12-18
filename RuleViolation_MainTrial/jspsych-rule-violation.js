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
        default: window.innerWidth,
        description: 'The width of the canvas.'
      },
      time_Bonus: {
        type: jsPsych.plugins.parameterType.BOOL,
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
        default: window.innerHeight,
        description: 'The height of the canvas.'
      },
      BlposX: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'BlposX',
        default: 'center',
        description: 'The horizontal start position.'
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
      stimuli: {
        type: jsPsych.plugins.parameterType.COMPLEX, // 
        array: false,
        pretty_name: 'Stimuli',
        description: 'The objects will be presented in the canvas.'
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
    ctx.font = '18px Arial'; 
    ctx.textAlign='center';

    trial.canvas = canvas;
    trial.context = ctx;

    // Center of canvas
    const centerX = canvas.width/2;
    const centerY = canvas.height/2;
    const rect_width= 50
    const conformity= Math.floor(Math.random() * 4) //25% probability for nonconformity
    if (Math.floor(Math.random() * 2) < 1) {  // 50% probability for blockade to be on either side
      trial.BlposX = 'left'
    } else {
      trial.BlposX = 'right'
    }

    var mouse_position = []
    let IT;
    let MT;
    let correct_reaction;
    let start_time;
    var points =0 ;
    var cw=canvas.width
    var ch=canvas.height
    var min_BonusTime = trial.min_BonusTime
    

    var rect_start = {
      x:centerX-rect_width/2,
      y:ch-2*rect_width,
      width:rect_width,
      height:rect_width
   };
    var rect_left = {
      x:50,
      y:50,
      width:rect_width,
      height:rect_width
    } ;
    var rect_right = {
      x:trial.canvas_width-100,
      y:50,
      width:rect_width,
      height:rect_width
    };

    canvas.addEventListener('click', start_button);

    // Blockade 
    block=trial.blockade
    block.img = new Image();
    block.img.src = trial.blockade.file
    BlposY = centerY
    if (trial.BlposX == 'right') {
      BlposX=centerX+200
    }
    else if (trial.BlposX == 'left') {
      BlposX=centerX - (200+trial.block_width)
    } else {alert('Keine Blockadenposition')}
  
    //Stimuli
    stimuli=trial.stimuli
    stimuli.img_1= new Image()
    stimuli.img_1.src =stimuli.stim_1
    stimuli.img_2= new Image()
    stimuli.img_2.src =stimuli.stim_2
    stim_1=stimuli.img_1
    stim_2=stimuli.img_2
    Start_canvas(ctx)
  
    // functions 

    function Start_canvas() {
      ctx.strokeRect(rect_start.x,rect_start.y,rect_start.width,rect_start.height);
      ctx.strokeRect(rect_left.x,rect_left.y,rect_left.width,rect_left.height);
      ctx.strokeRect(rect_right.x,rect_right.y,rect_right.width,rect_right.height);
      draw_reminder()
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
    ctx.clearRect(centerX-200, centerY-150, 400, 300);
    draw_blockade()
    canvas.addEventListener('click', finish_trial)
    canvas.addEventListener('mousemove',recordMousePosition)
    }

    function recordMousePosition(evt) {
      var mousePos = getMousePos(canvas, evt);
      mouse_position.push(mousePos)
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
    
    function draw_blockade() {
      var width=trial.block_width
      var height=trial.block_height
      ctx.drawImage(block.img,BlposX,BlposY-height/2,width,height);
    }

    function draw_reminder() {
     ctx.drawImage(stim_1,cw/2-125,ch/2-25,50,50)
     ctx.drawImage(stim_2,cw/2+100,ch/2-25,50,50)

      if (trial.time_Bonus) {
        ctx.fillText('ZEITBONUS!',cw/2,ch/2+20)
      } else {}

      if (conformity <1) {
        var reminder = 'Breche die Regel!'
        ctx.fillText(reminder, cw/2,ch/2)
      } else {
        }

    }

    function draw_stimulus(stim) {
      if (stim=='left') {ctx.drawImage(stim_1,cw/2-25,ch/2-25,50,50)
       } else if (stim=='right') { ctx.drawImage(stim_2,cw/2-25,ch/2-25,50,50)
      } else {alert('Kein Stimulus ausgewaehlt')}
    }

    function show_stimulus() {
      ctx.clearRect(centerX-200, centerY-150, 400, 300);
      draw_stimulus(stimuli.correct)
      draw_blockade();
      start_time =  performance.now();
    }
   
    function finish_trial(evt) {
      var mousePos = getMousePos(canvas, evt);
      if (isInside(mousePos,rect_left)) {
        correct_reaction= stimuli.correct== 'left' 
        feedback()
        } else if (isInside(mousePos,rect_right)) {
          correct_reaction= stimuli.correct== 'right'
          feedback()
        }
        else {
        }   
    }

    function feedback(){
      MT= performance.now() - IT
      if (conformity == 0) {
        correct_reaction = ! correct_reaction
      }
      if (correct_reaction){
        if (trial.time_Bonus && MT<min_BonusTime) {
          points=10
        } else {
          points=1
        }
      }

      canvas.removeEventListener('mousemove',recordMousePosition)
      canvas.removeEventListener('click', feedback);  
      ctx.clearRect(0, ch/2-150, cw, 300); 
      if (correct_reaction) {
        ctx.fillText('RICHTIG! '+'+'+ points,cw/2,ch/2)
        //ctx.fillText('Weiter mit Mausklick',cw/2,ch/2+20)
      } else {
        ctx.fillText('FALSCH!',cw/2,ch/2)
        //ctx.fillText('Weiter mit Mausklick',cw/2,ch/2+20)
      }
      setTimeout(end_trial,500)
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
      Points: points
    };
      jsPsych.finishTrial(trial_data);
    }
  };

  return plugin;
})();
