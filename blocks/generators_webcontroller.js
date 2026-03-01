var port_value=80;
Blockly.Python['websocket_begin'] = function(block) {
  port_value = block.getFieldValue('port');
  var code = `ws_list = [] # Active WebSocket list
def _acceptWebSocketCallback(webSocket, httpClient) :
  print("WS ACCEPT")
  webSocket.RecvTextCallback   = _recvTextCallback
  webSocket.RecvBinaryCallback = _recvBinaryCallback
  webSocket.ClosedCallback 	 = _closedCallback
  ws_list.append(webSocket)

def _recvBinaryCallback(webSocket, data) :
  print("WS RECV DATA : %s" % data)

def _closedCallback(webSocket) :
  print("WS CLOSED")
  ws_list.remove(webSocket)

`;
  return code;
};

Blockly.Python['web_onpath_handlecmd'] = function(block) {
  // 1. Setup variables for the callback logic
  var globals = [];
  var varName;
  var workspace = block.workspace;
  var variables = Blockly.Variables.allUsedVarModels(workspace) || [];
  for (var i = 0, variable; variable = variables[i]; i++) {
    varName = variable.name;
    if (block.getVars().indexOf(varName) == -1) {
      globals.push(Blockly.Python.variableDB_.getName(varName,
          Blockly.VARIABLE_CATEGORY_NAME));
    }
  }
  var devVarList = Blockly.Variables.allDeveloperVariables(workspace);
  for (var i = 0; i < devVarList.length; i++) {
    globals.push(Blockly.Python.variableDB_.getName(devVarList[i],
        Blockly.Names.DEVELOPER_VARIABLE_TYPE));
  }

  // 2. Prepare indentation for the nested statements
  var statements_callback = Blockly.Python.statementToCode(block, 'callback');
  // Double indent (6 spaces) to stay inside 'try' which is inside 'def process'
  statements_callback = '    ' + statements_callback.replace(/\n/g, '\n      ');
  
  var globalCode = globals.length ?
      '      global ' + globals.join(', ') + '\n' : '';

  // 3. Define the classes and the process method as one block in definitions_
  // This ensures the method stays inside the class scope
  Blockly.Python.definitions_['class_WebSocketServerSystem'] = 
    'class TestServer(WebSocketServer):\n' +
    '  def __init__(self):\n' +
    '    super().__init__("index.html", 100)\n' + 
    '  def _make_client(self, conn):\n' + 
    '    return TestClient(conn)\n' +
    '\n' +
    'class TestClient(WebSocketClient):\n' +
    '  value = 0\n' +
    '  def __init__(self, conn):\n' +
    '    super().__init__(conn)\n' +
    '\n' +
    '  def process(self):\n' +
    '    try:\n' +
    '      rr_data = self.connection.read()\n' +
    '      if not rr_data:\n' +
    '        previousValue = self.value\n' +
    '        self.value = random.randint(0,200)\n' +
    '        if previousValue != self.value:\n' +
    '          self.connection.write(str(self.value))\n' +
    '        return\n' +
    '      rr_data = rr_data.decode("utf-8")\n' +
    '      temp_msg = rr_data.split("#")\n' +
    '      msg = temp_msg[len(temp_msg)-2]\n' +
           globalCode + 
           (statements_callback || '      pass') + '\n' +
    '    except ClientClosedError:\n' +
    '      print("Connection close error")\n' +
    '      self.connection.close()';

  var code = '';
  return code;
};



Blockly.Python['args_getvalue'] = function(block) {
  var s_idchar = block.getFieldValue('id_char');
  var code = `int(msg.replace('${s_idchar}', ''))`;
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['args_get_s_joystick_value'] = function(block) {
//  var d_index = block.getFieldValue('index');
  var dropdown_pos = block.getFieldValue('position');
  var code = `int(msg.split(',')[${dropdown_pos}])`;
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['args_get_d_joystick_value'] = function(block) {
//  var d_index = block.getFieldValue('index');
  var dropdown_pos = block.getFieldValue('position');
  var code = `int(msg.split(',')[${dropdown_pos}])`;
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['args_getkey'] = function(block) {
  var code = `msg`;
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['html_tile'] = function(block) {
  Blockly.Python.definitions_['from_ws_connection'] = 'from ws_connection import ClientClosedError';
  Blockly.Python.definitions_['import_random'] = 'import random';
  Blockly.Python.definitions_['from_ws_server'] = 'from ws_server import WebSocketServer, WebSocketClient';
  
  var title_name = block.getFieldValue('title_name');
  var title_callback = Blockly.Python.statementToCode(block, 'callback');
  var title_end = `
</html>
"""
file.write(CONTENT)
file.close()

server = TestServer()
server.start()

while True:
  server.process_all()
server.stop()`;

  var code = `
file = open("index"+".html", "w")
CONTENT = """\\
<!DOCTYPE html>
<html lang="en">
<meta charset="UTF-8">
<title>${title_name}</title>
<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1, maximum-scale=1">
<style type="text/css" media="screen">
  .rcdiv {
    border: 3px outset red;
    background-color: lightblue;
    text-align: center;
  }
  .container {
    margin: 10px auto;
    max-width: 600px;
    text-align: center;
  }
  .rctable {
    margin-left: auto;
    margin-right: auto;
    border: 1;
  }

  progress[value] {
        -webkit-appearance: none;
        appearance: none;
       background-color: #eee;
        width: 80px;
        height: 15px;
		border: 2px;
      }
    progress::-webkit-progress-bar {
        background-color: #222;
        border-radius: 2px;
    }
  
   progress[value]::-webkit-progress-value {
      background-color:red;
        } 

  input[type=button]{
  border: 4px solid blue;
  padding: 15px;
  color: rgb(50, 0, 54);
  background-color: rgb(177, 110, 149);
  border-radius: 15px;
  border-color:black;
  }

 input[type=button]:active
{
  //background: linear-gradient(#53AFFF,#5FCDFF);
  transform: translateY(2px);
  border-color: red
}

//https://randomnerdtutorials.com/esp32-web-server-websocket-sliders/?fbclid=IwAR0C4ChdH8kIQ8Qmv4q6VTfUSHT2l7-HVvzkhjz_rqW0yuXXKEH0hSE2aTU
.scontent {
    padding: 30px;
  }
 .card-grid {
    max-width: 400px;
    margin: 0 auto;
    display: grid;
    grid-gap: 2rem;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  }
  .card {
    width: 150px;
    background-color: white;
    box-shadow: 2px 2px 12px 1px rgba(140,140,140,.5);

  }
  .card-title {
    font-size: 18px;
    
    font-weight: bold;
    color: #034078
  }
.slider {
  -webkit-appearance: none;
  margin: 0 auto;
  width: 100%;
  height: 15px;
  border-radius: 10px;
  background: #FFD65C;
  outline: none;
}
.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #034078;
  cursor: pointer;
}
.slider::-moz-range-thumb {
  width: 30px;
  height: 30px;
  border-radius: 50% ;
  background: #034078;
  cursor: pointer;
}
.switch {
  padding-left: 5%;
  padding-right: 5%;
}

   /* toggle in label designing */
        .toggle {
            position :  relative;
            display : inline-block;
            width : 93.5px;
            height : 30px;
            background-color: green;
            border-radius: 29px;
            border: 3px solid gray;
            
        }

        /* After slide changes */
        .toggle:after {
            content: '';
            position: absolute;
            width: 46px;
            height: 30px;
            border-radius: 29px;
            background-color: gray;
            top: 0px;
            left: 0px;
            transition:  all 0.5s;
        }

        /* Toggle text */
        p {
            line-height: 3px;
            font-weight: bold;
            text-align:  center;
             
        }

        /* Checkbox checked effect */
        .checkbox:checked + .toggle::after {
            left : 48px;
        }

        /* Checkbox checked toggle label bg color */
        .checkbox:checked + .toggle {
            background-color: red;
        }

        /* Checkbox vanished */
        .checkbox {
            display : none;
        }
   .noselect {
    -webkit-touch-callout: none; /* iOS Safari */
     -webkit-user-select: none; /* Safari */
       -khtml-user-select: none; /* Konqueror HTML */
         -moz-user-select: none; /* Firefox */
          -ms-user-select: none; /* Internet Explorer/Edge */
              user-select: none; /* Non-prefixed version */
  }                                      
</style>
<body class="noselect">
  <div class="container">
 <h2>${title_name}</h2>${title_callback}
 </div>
</body>

<script type="text/javascript">
var connection = new WebSocket('ws://'+location.hostname+':'+${port_value});
var bar = document.getElementById("file");
connection.onmessage = function (evt) {
        bar.value = evt.data;
};
function iotAction(action) {
	 action=action+"#";
     console.log(action);
     connection.send(action);
}

function toggleButtonSwitch(code) {
  var switchButton = document.getElementById(code);
  
  if (switchButton.checked) {
    console.log("On!");
   iotAction(code+'1')
  } else {
    console.log("Off!");
    iotAction(code+'0')
  }
}

/* https://github.com/bobboteck/JoyStick/blob/master/joy.min.js */
let StickStatus={xPosition:0,yPosition:0,x:0,y:0,cardinalDirection:"C"};var JoyStick=function(t,e,i){var o=void 0===(e=e||{}).title?"joystick":e.title,n=void 0===e.width?0:e.width,a=void 0===e.height?0:e.height,r=void 0===e.internalFillColor?"#00AA00":e.internalFillColor,c=void 0===e.internalLineWidth?2:e.internalLineWidth,s=void 0===e.internalStrokeColor?"#003300":e.internalStrokeColor,d=void 0===e.externalLineWidth?2:e.externalLineWidth,u=void 0===e.externalStrokeColor?"#008000":e.externalStrokeColor,h=void 0===e.autoReturnToCenter||e.autoReturnToCenter;i=i||function(t){};var S=document.getElementById(t);S.style.touchAction="none";var f=document.createElement("canvas");f.id=o,0===n&&(n=S.clientWidth),0===a&&(a=S.clientHeight),f.width=n,f.height=a,S.appendChild(f);var l=f.getContext("2d"),k=0,g=2*Math.PI,x=(f.width-(f.width/2+10))/2,v=x+5,P=x+30,m=f.width/2,C=f.height/2,p=f.width/10,y=-1*p,w=f.height/10,L=-1*w,F=m,E=C;function W(){l.beginPath(),l.arc(m,C,P,0,g,!1),l.lineWidth=d,l.strokeStyle=u,l.stroke()}function T(){l.beginPath(),F<x&&(F=v),F+x>f.width&&(F=f.width-v),E<x&&(E=v),E+x>f.height&&(E=f.height-v),l.arc(F,E,x,0,g,!1);var t=l.createRadialGradient(m,C,5,m,C,200);t.addColorStop(0,r),t.addColorStop(1,s),l.fillStyle=t,l.fill(),l.lineWidth=c,l.strokeStyle=s,l.stroke()}function D(){let t="",e=F-m,i=E-C;return i>=L&&i<=w&&(t="C"),i<L&&(t="N"),i>w&&(t="S"),e<y&&("C"===t?t="W":t+="W"),e>p&&("C"===t?t="E":t+="E"),t}"ontouchstart"in document.documentElement?(f.addEventListener("touchstart",function(t){k=1},!1),document.addEventListener("touchmove",function(t){1===k&&t.targetTouches[0].target===f&&(F=t.targetTouches[0].pageX,E=t.targetTouches[0].pageY,"BODY"===f.offsetParent.tagName.toUpperCase()?(F-=f.offsetLeft,E-=f.offsetTop):(F-=f.offsetParent.offsetLeft,E-=f.offsetParent.offsetTop),l.clearRect(0,0,f.width,f.height),W(),T(),StickStatus.xPosition=F,StickStatus.yPosition=E,StickStatus.x=((F-m)/v*100).toFixed(),StickStatus.y=((E-C)/v*100*-1).toFixed(),StickStatus.cardinalDirection=D(),i(StickStatus))},!1),document.addEventListener("touchend",function(t){k=0,h&&(F=m,E=C);l.clearRect(0,0,f.width,f.height),W(),T(),StickStatus.xPosition=F,StickStatus.yPosition=E,StickStatus.x=((F-m)/v*100).toFixed(),StickStatus.y=((E-C)/v*100*-1).toFixed(),StickStatus.cardinalDirection=D(),i(StickStatus)},!1)):(f.addEventListener("mousedown",function(t){k=1},!1),document.addEventListener("mousemove",function(t){1===k&&(F=t.pageX,E=t.pageY,"BODY"===f.offsetParent.tagName.toUpperCase()?(F-=f.offsetLeft,E-=f.offsetTop):(F-=f.offsetParent.offsetLeft,E-=f.offsetParent.offsetTop),l.clearRect(0,0,f.width,f.height),W(),T(),StickStatus.xPosition=F,StickStatus.yPosition=E,StickStatus.x=((F-m)/v*100).toFixed(),StickStatus.y=((E-C)/v*100*-1).toFixed(),StickStatus.cardinalDirection=D(),i(StickStatus))},!1),document.addEventListener("mouseup",function(t){k=0,h&&(F=m,E=C);l.clearRect(0,0,f.width,f.height),W(),T(),StickStatus.xPosition=F,StickStatus.yPosition=E,StickStatus.x=((F-m)/v*100).toFixed(),StickStatus.y=((E-C)/v*100*-1).toFixed(),StickStatus.cardinalDirection=D(),i(StickStatus)},!1)),W(),T(),this.GetWidth=function(){return f.width},this.GetHeight=function(){return f.height},this.GetPosX=function(){return F},this.GetPosY=function(){return E},this.GetX=function(){return((F-m)/v*100).toFixed()},this.GetY=function(){return((E-C)/v*100*-1).toFixed()},this.GetDir=function(){return D()}};

var coo=${j_coo};
var j_x1,j_y1,j_x2,j_y2;
j_x1=100, j_y1=100, j_x2=100, j_y2=100;
if (coo) {
var joyParam = { "title": "Joystick", "autoReturnToCenter": ${j_center} };
var joy = new JoyStick('joy', joyParam , function(stickData) {
    joyX.value =parseInt(stickData.xPosition);
    joyY.value =200-parseInt(stickData.yPosition);
    var decode='${j_code}'+','+parseInt(joy.GetPosX()).toString()+','+(200-parseInt(joy.GetPosY())).toString();
    iotAction(decode); 
});
} else {
var joy21Param = { "title": "Joystick21", "autoReturnToCenter": ${j_l_center} };
var joy21 = new JoyStick('joy21', joy21Param , function(stickData) {
    joy21X.value =parseInt(stickData.xPosition);
    joy21Y.value =200-parseInt(stickData.yPosition);
    if ((parseInt(joy21.GetPosX()) != j_x1) || ((200-parseInt(joy21.GetPosY())) != j_y1)) {
      j_x1=parseInt(joy21.GetPosX());
      j_y1=200-parseInt(joy21.GetPosY());
      var decode='${j_lr_code}'+','+j_x1.toString()+','+j_y1.toString()+','+j_x2.toString()+','+j_y2.toString();
	iotAction(decode)}; 
});
var joy22Param = { "title": "Joystick22", "autoReturnToCenter": ${j_r_center} };
var joy22 = new JoyStick('joy22', joy22Param , function(stickData) {
    joy22X.value =parseInt(stickData.xPosition);
    joy22Y.value =200-parseInt(stickData.yPosition);
    if ((parseInt(joy22.GetPosX()) != j_x2) || ((200-parseInt(joy22.GetPosY())) != j_y2)) {
       j_x2=parseInt(joy22.GetPosX());
       j_y2=200-parseInt(joy22.GetPosY());
       var decode='${j_lr_code}'+','+j_x1.toString()+','+j_y1.toString()+','+j_x2.toString()+','+j_y2.toString();
   	iotAction(decode)}; 
});

}
</script>
${title_end}
`;
  return code;
};

Blockly.Python['html_table'] = function(block) {
  //var title_name = block.getFieldValue('title_name');
  var table_callback = Blockly.Python.statementToCode(block, 'callback');
  var table_end = `        </tr>
      </tbody>
    </table>`;

  var code = `
     <table class="rctable" >
      <tbody>
        <tr><!-- row -->
${table_callback}    ${table_end}`;
  return code;
};

Blockly.Python['html_slider_grid'] = function(block) {
  //var title_name = block.getFieldValue('title_name');
  var grid_callback = Blockly.Python.statementToCode(block, 'callback');
  var grid_end = `      </div></td> </tr>
      </tbody>
    </table>`;

  var code = `
     <table class="rctable" >
      <tbody>
      <tr><!-- row -->
      <td>
       <div class="card-grid">
${grid_callback}    ${grid_end}`;
  return code;
};


Blockly.Python['html_button'] = function(block) {
  var color = block.getFieldValue('color');
  var b_name = block.getFieldValue('name');
  var touch_s = block.getFieldValue('touch_s');
  var touch_e = block.getFieldValue('touch_e');
  var b_circle=(block.getFieldValue('circle')=='TRUE'? 'border-radius: 70px; width: 70px; height: 70px' : 'border-radius: 15px; width: 100%; height: 100%');
  var code = `    <td><input type="button" value="${b_name}" style ="background-color:${color};font-weight: bold;font-size : 18px; ${b_circle}" onmousedown="iotAction('${touch_s}')" onmouseup="iotAction('${touch_e}')" ontouchstart="iotAction('${touch_s}')" ontouchend="iotAction('${touch_e}')"/></td>
`;
  return code;
};


Blockly.Python['html_label'] = function(block) {
  var l_color = block.getFieldValue('color');
  var l_context = block.getFieldValue('context');
  var l_fontsize = block.getFieldValue('fontsize');
  var code = `  <td>
     <label  style="color:${l_color};padding-right: 5px;font-weight: bold;font-size: ${l_fontsize}px">${l_context}</label>
   </td>
`;
  return code;
};

Blockly.Python['html_image'] = function(block) {
  var i_code = block.getFieldValue('code');
  var i_width = block.getFieldValue('width');
  var i_height = block.getFieldValue('height');
  var code = `  <td>
       <img src="${i_code}" width="${i_width}%" height="${i_height}%" />
   </td>
`;
  return code;
};
var j_code='';
var j_center=true;
Blockly.Python['html_joystick'] = function(block) {
   j_code = block.getFieldValue('code');
  var j_width = block.getFieldValue('width')*2;
  var j_height = block.getFieldValue('height')*2;
  j_center=(block.getFieldValue('center')=='TRUE'? 'true' : 'false');
  j_coo='true';
  var code = `  
        <div id="joy" style="width:${j_width}px;height:${j_height}px;margin:auto;"></div>
         X :<input id="joyX" type="text" size="1" /></br></br>
         Y :<input id="joyY" type="text" size="1" />
`;
  return code;
};
var j_coo;
var j_lr_code;
var j_l_center;
var j_r_center;

Blockly.Python['html_two_joystick'] = function(block) {
   j_lr_code = block.getFieldValue('lr_code');
  var j_l_width = block.getFieldValue('l_width')*2;
  var j_l_height = block.getFieldValue('l_height')*2;
  j_l_center=(block.getFieldValue('l_center')=='TRUE'? 'true' : 'false');
  var j_r_width = block.getFieldValue('r_width')*2;
  var j_r_height = block.getFieldValue('r_height')*2;
  j_r_center=(block.getFieldValue('r_center')=='TRUE'? 'true' : 'false');
  j_coo='false';
  var code = `  
     <div style="width: 100%;">
        <div style="width: 50%; height: 100px; float: left; background: white;"> 
        <div id="joy21" style="width:${j_l_width}px;height:${j_l_height}px;margin:auto;"></div>
         X :<input id="joy21X" type="text" size="1" /></br></br>
         Y :<input id="joy21Y" type="text" size="1" />
        </div>
        <div style="margin-left: 50%; height: 100px; background: white;"> 
        <div id="joy22" style="width:${j_r_width}px;height:${j_r_height}px;margin:auto;"></div>
         X :<input id="joy22X" type="text" size="1" /></br></br>
         Y :<input id="joy22Y" type="text" size="1" />
        </div>
    </div>
`;
  return code;
};


Blockly.Python['html_slider'] = function(block) {
  var s_name = block.getFieldValue('name');
  var s_min = block.getFieldValue('min');
  var s_max = block.getFieldValue('max');
  var s_value = block.getFieldValue('value');
  var s_step=block.getFieldValue('step');
  var s_idchar = block.getFieldValue('id_char');
  var code = `  
     <div class="card">
       <p class="card-title">${s_name}</p>
        <p class="switch"><input type="range" value="${s_value}" min="${s_min}" max="${s_max}" step="${s_step}"
        oninput="document.getElementById('${s_name}').innerHTML =this.value" onchange="iotAction('${s_idchar}'+this.value)" ontouchmove="iotAction('${s_idchar}'+this.value)" class="slider">
        </p>
         <label id="${s_name}" style="padding-right: 30px;font-weight: bold;font-size: 18px "></label>
        </div>       
 `;
  return code;
};

Blockly.Python['html_togglesw'] = function(block) {
  var s_name = block.getFieldValue('name');
  var s_on = block.getFieldValue('on');
  var s_off = block.getFieldValue('off');
  var s_idchar = block.getFieldValue('id_char');
  var code = `   <td>
            <label  style="padding-right: 5px;font-weight: bold;font-size: 18px">${s_name}</label>
            <input type="checkbox" id="${s_idchar}"  class="checkbox" onclick="toggleButtonSwitch('${s_idchar}')" />
<label for="${s_idchar}" class="toggle">
 <p>${s_on} ${s_off}</p>
</label>

            </td>    `;
  return code;
};

Blockly.Python['html_line'] = function(block) {
  var s_num = block.getFieldValue('num');
  var code = `   <td>
       <br style="line-height:${s_num};">      
  </td>    `;
  return code;
};

Blockly.Python['joystick_direction'] = function(block) {
  Blockly.Python.definitions_['import_math'] = 'import math';
  var s_x = Blockly.Python.valueToCode(block, 'x', Blockly.Python.ORDER_ATOMIC);
  var s_y = Blockly.Python.valueToCode(block, 'y', Blockly.Python.ORDER_ATOMIC);
  var s_result = Blockly.Python.valueToCode(block, 'result', Blockly.Python.ORDER_ATOMIC);
  var code = `if math.fabs(${s_x} -100) < 5 and math.fabs(${s_y} -100) <5:
  ${s_result}=0
else:
  if math.fabs(${s_x} -100) > math.fabs(${s_y} -100):
    if (${s_x} -100) > 0:
      ${s_result}=4
    else:
      ${s_result}=3
  else:
    if (${s_y} -100) > 0:
      ${s_result}=1
    else:
      ${s_result}=2\n`;

  return code;
};


Blockly.Python['html_progress'] = function(block) {
  var code = `   <td>
          <label for="file" font-weight: bold;font-size: 18px>連線狀態:</label>
        <progress id="file" style="width: 80px; height: 15px;" value="0" max="100"> </progress>
  </td>    `;
  return code;
};


