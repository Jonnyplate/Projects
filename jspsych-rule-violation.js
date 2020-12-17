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

    const elm_jspsych_content = document.getElementById('jspsych-content');
    const style_jspsych_content = window.getComputedStyle(elm_jspsych_content); // stock
    const default_maxWidth = style_jspsych_content.maxWidth;
    elm_jspsych_content.style.maxWidth = 'none'; // The default value is '95%'. To fit the window.

    let new_html = '<canvas id="myCanvas" class="jspsych-canvas" width=' + trial.canvas_width + ' height=' + trial.canvas_height + ' style="background-color:' + '#fff' + ';"></canvas>';
    display_element.innerHTML = new_html;

    const canvas = document.getElementById('myCanvas');
    if ( ! canvas || ! canvas.getContext ) {
      alert('This browser does not support the canvas element.');
      return;
    }

    const ctx = canvas.getContext('2d');

    trial.canvas = canvas;
    trial.context = ctx;

    // Center of canvas
    const centerX = canvas.width/2;
    const centerY = canvas.height/2;
    const rect_width= 50
    
    var mouse_position = []
    var IT=0
    var MT=0
    let start_time;
    

    var rect_start = {
      x:trial.canvas_width/2-rect_width/2,
      y:trial.canvas_height-2*rect_width,
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
    BlposY = trial.canvas_height/2
    if (trial.BlposX == 'right') {
      BlposX=trial.canvas_width/2+200
    }
    else if (trial.BlposX == 'left') {
      BlposX=trial.canvas_width/2 - (200+trial.block_width)
    } else {alert('Keine Blockadenposition')}
  
    //Stimuli
    stimuli=trial.stimuli
    stimuli.img_pawn= new Image()
    stimuli.img_pawn.src =stimuli.pawn
    stimuli.img_king= new Image()
    stimuli.img_king.src =stimuli.king
    pawn=stimuli.img_pawn
    king=stimuli.img_king
    Start_canvas(ctx)
  
    // functions 

    function Start_canvas() {
      ctx.strokeRect(rect_start.x,rect_start.y,rect_start.width,rect_start.height);
      ctx.strokeRect(rect_left.x,rect_left.y,rect_left.width,rect_left.height);
      ctx.strokeRect(rect_right.x,rect_right.y,rect_right.width,rect_right.height);
      ctx.font = "30px Arial";
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
    ctx.clearRect(trial.canvas_width/2-200, trial.canvas_height/2-150, 400, 300);
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
     var cw=trial.canvas_width
     var ch=trial.canvas_height
    ctx.drawImage(pawn,cw/2-125,ch/2,50,50)
    ctx.drawImage(king,cw/2+100,ch/2,50,50)
    }

    function draw_stimulus(img) {
      var cw=trial.canvas_width
      var ch=trial.canvas_height
      if (img=='left') {ctx.drawImage(pawn,cw/2-25,ch/2-25,50,50)
       } else if (img=='right') { ctx.drawImage(king,cw/2-25,ch/2-25,50,50)
      } else {alert('Kein Stimulus ausgewaehlt')}
    }

    function show_stimulus() {
      ctx.clearRect(trial.canvas_width/2-200, trial.canvas_height/2-150, 400, 300);
      draw_stimulus(stimuli.correct)
      draw_blockade();
      start_time =  performance.now();
    }
   
    function finish_trial(evt) {
      var mousePos = getMousePos(canvas, evt);
      if (isInside(mousePos,rect_left)) {
        end_trial()
        } else if (isInside(mousePos,rect_right)) {
          end_trial()
        }
        else {
        }   
    }
    // end trial
    function end_trial() {
      MT= performance.now() - IT
      canvas.removeEventListener('click', finish_trial);
      canvas.removeEventListener('mousemove',recordMousePosition)
        // data saving
    var trial_data = {
      mousePosition: mouse_position,
      IT: IT,
      MT: MT,
      start_time: start_time
    };
      jsPsych.finishTrial(trial_data);
    }
  };

  return plugin;
})();
