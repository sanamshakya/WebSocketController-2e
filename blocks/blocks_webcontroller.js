Blockly.defineBlocksWithJsonArray(
[
{
  "type": "websocket_begin",
  "message0": "Start WebSocket Server || Port : %1",
  "args0": [
    {
      "type": "field_number",
      "name": "port",
      "value": 80
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": "339999",
  "tooltip": "Initialize the WebSocket server on the specified port.",
  "helpUrl": ""
},
{
  "type": "web_onpath_handlecmd",
  "message0": "After receiving web data, handle function %1 Program Area %2",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "callback"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": "339999",
  "tooltip": "Define the logic to execute when the server receives data from the web interface.",
  "helpUrl": ""
},
{
  "type": "key_in_args",
  "message0": "Parameter Name: %1 is in query string format?",
  "args0": [
    {
      "type": "field_input",
      "name": "key",
      "text": ""
    }
  ],
  "output": "Boolean",
  "colour": "339999",
  "tooltip": "Check if a specific key exists in the received data.",
  "helpUrl": ""
},
{
  "type": "html_tile",
  "message0": "Set Web Server, Control Interface - Main Title : %1 %2 Program Area %3",
  "args0": [
    {
      "type": "field_input",
      "name": "title_name",
      "text": "Remote Control"
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "callback"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": "339999",
  "tooltip": "Configure the web server and set the main title for the UI.",
  "helpUrl": ""
},
{
  "type": "html_table",
  "message0": "Add a Row %1 Component Area %2",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "callback"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": "339999",
  "tooltip": "Create a new row in the UI to hold components like buttons.",
  "helpUrl": ""
},
{
  "type": "html_slider_grid",
  "message0": "Add a Row %1 Slider Grid Area %2",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "callback"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": "339999",
  "tooltip": "Create a specific row layout optimized for sliders.",
  "helpUrl": ""
},
{
  "type": "html_button",
  "message0": "Add Button Color : %1 Name : %2 Pressed : %3 Released : %4 || Round : %5",
  "args0": [
     {
      "type": "field_colour",
      "name": "color",
      "colour": "#ff0000"
      },
     {
      "type": "field_input",
      "name": "name",
      "text": "Forward"
    },
     {
      "type": "field_input",
      "name": "touch_s",
      "text": "f"
    },
    {
      "type": "field_input",
      "name": "touch_e",
      "text": "s"
    },
    {
      "type": "field_checkbox",
      "name": "circle",
      "checked": false
   }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": "339999",
  "tooltip": "Add a button that sends specific strings when pressed or released.",
  "helpUrl": ""
},
{
  "type": "html_label",
  "message0": "Add Sub-title Content : %1 Font Size: %2 Color : %3",
  "args0": [
     
     {
      "type": "field_input",
      "name": "context",
      "text": "Test 1"
    },
     {
      "type": "field_input",
      "name": "fontsize",
      "text": "15"
    },
     {
      "type": "field_colour",
      "name": "color",
      "colour": "#ff0000"
      }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": "339999",
  "tooltip": "Add a text label to the web interface.",
  "helpUrl": ""
},
{
  "type": "html_slider",
  "message0": "Add Slider Title : %1 Min: %2 Max: %3 Step: %4 Initial: %5 Send ID String: %6",
  "args0": [
     {
      "type": "field_input",
      "name": "name",
      "text": "Motor 1"
    },
     {
      "type": "field_input",
      "name": "min",
      "text": "0"
    },
    {
      "type": "field_input",
      "name": "max",
      "text": "180"
    },
    {
      "type": "field_input",
      "name": "step",
      "text": "10"
    },
    {
      "type": "field_input",
      "name": "value",
      "text": "90"
    },
     {
      "type": "field_input",
      "name": "id_char",
      "text": "a"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": "339999",
  "tooltip": "Add a slider that sends its value preceded by an identifier.",
  "helpUrl": ""
},
{
  "type": "html_togglesw",
  "message0": "Add Switch Title : %1 [ON] Display: %2 [OFF] Display: %3 Send ID String: %4",
  "args0": [
     {
      "type": "field_input",
      "name": "name",
      "text": "Internal LED"
    },
     {
      "type": "field_input",
      "name": "on",
      "text": "ON"
    },
    {
      "type": "field_input",
      "name": "off",
      "text": "OFF"
    },
    {
      "type": "field_input",
      "name": "id_char",
      "text": "SW1"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": "339999",
  "tooltip": "Add a toggle switch to the interface.",
  "helpUrl": ""
},
{
  "type": "html_image",
  "message0": "Add 128x128 Image (Base64) Code : %1 Scale-[ Width: %2 %% Height: %3 %%]",
  "args0": [
    {
      "type": "field_input",
      "name": "code",
      "text": "data:image/png;base64,..."
    },
    {
      "type": "field_input",
      "name": "width",
      "text": "100"
    },
    {
      "type": "field_input",
      "name": "height",
      "text": "100"
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour":"339999",
  "tooltip": "Insert a Base64 encoded image into the interface.",
  "helpUrl": "http://www.base64-image.de"
},
{
  "type": "html_joystick",
  "message0": "Add Virtual Joystick Scale-[ Width: %1 %% Height: %2 %%] Send ID String: %3 || Auto-Center: %4",
  "args0": [
    {
      "type": "field_input",
      "name": "width",
      "text": "100"
    },
    {
      "type": "field_input",
      "name": "height",
      "text": "100"
    },
    {
      "type": "field_input",
      "name": "code",
      "text": "joystick"
    },
    {
      "type": "field_checkbox",
      "name": "center",
      "checked": true
   }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour":"339999",
  "tooltip": "Add a single joystick control.",
  "helpUrl": ""
},
{
  "type": "html_two_joystick",
  "message0": "Add Dual Joystick Setup Send ID String %1 %2 Left Joystick : Scale-[ Width: %3 %% Height: %4 %%] || Auto-Center: %5 %6 Right Joystick : Scale-[ Width: %7 %% Height: %8 %%] || Auto-Center: %9",
  "args0": [
    {
      "type": "field_input",
      "name": "lr_code",
      "text": "joystick"
    },
     {
      "type": "input_dummy"
    },
    {
      "type": "field_input",
      "name": "l_width",
      "text": "100"
    },
    {
      "type": "field_input",
      "name": "l_height",
      "text": "100"
    },
    {
      "type": "field_checkbox",
      "name": "l_center",
      "checked": true
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "field_input",
      "name": "r_width",
      "text": "100"
    },
    {
      "type": "field_input",
      "name": "r_height",
      "text": "100"
    },
    {
      "type": "field_checkbox",
      "name": "r_center",
      "checked": true
   }
  ],
  "inputsInline": false,
  "previousStatement": null,
  "nextStatement": null,
  "colour":"339999",
  "tooltip": "Add two joystick controls to the interface.",
  "helpUrl": ""
},
{
  "type": "html_line",
  "message0": "Add Empty Line Count: %1",
  "args0": [
    {
      "type": "field_input",
      "name": "num",
      "text": "1"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": "339999",
  "tooltip": "Add vertical spacing to the UI.",
  "helpUrl": ""
},
{
  "type": "args_getvalue",
  "message0": "Get Data Value after ID String: %1",
  "args0": [
     {
      "type": "field_input",
      "name": "id_char",
      "check": ""
    }
  ],
  "output": null,
  "colour": "339999",
  "tooltip": "Extract numerical data sent after an identifier (e.g., extracting '90' from 'a90').",
  "helpUrl": ""
},
{
  "type": "args_get_s_joystick_value",
  "message0": "Get Coordinate %1 Value from Single Joystick String",
  "args0": [
     {
      "type": "field_dropdown",
      "name": "position",
      "options": [
        ["X", "1"],
        ["Y", "2"]
      ]
    }
  ],
  "output": null,
  "colour": "339999",
  "tooltip": "Parse X or Y coordinates from a single joystick data string.",
  "helpUrl": ""
},
{
  "type": "args_getkey",
  "message0": "Query Corresponding Value of Received String",
  "output": null,
  "colour": "339999",
  "tooltip": "Retrieve the raw string or value received from the web.",
  "helpUrl": ""
},
{
  "type": "args_get_d_joystick_value",
  "message0": "Get Coordinate %1 Value from Dual Joysticks",
  "args0": [
     {
      "type": "field_dropdown",
      "name": "position",
      "options": [
        ["Left-X", "1"],
        ["Left-Y", "2"],
        ["Right-X", "3"],
        ["Right-Y", "4"]
      ]
    }
  ],
  "output": null,
  "colour": "339999",
  "tooltip": "Parse specific axis values from a dual joystick data string.",
  "helpUrl": ""
},
{
  "type": "joystick_direction",
  "message0": "Convert Joystick X: %1 and Y: %2 to Four Direction Values in %3",
  "args0": [
    {
      "type": "input_value",
      "name": "x",
      "text": "0"
    },
    {
      "type": "input_value",
      "name": "y",
      "text": "0"
    },
    {
      "type": "input_value",
      "name": "result",
      "text": "0"
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": "339999",
  "tooltip": "Map X/Y coordinates to Up, Down, Left, Right directions.",
  "helpUrl": ""
},
{
  "type": "html_progress",
  "message0": "Add Connection Status Display",
  "previousStatement": null,
  "nextStatement": null,
  "colour": "#E74C3C",
  "tooltip": "Show a visual indicator of the WebSocket connection status.",
  "helpUrl": ""
}
]);
