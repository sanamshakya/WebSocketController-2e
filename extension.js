({
    name: "Web RC", // Category Name (Originally: 網頁遙控器)
    description: "WebSocket_Server",
    author: "YP & Mason",
    category: "Communication",
    version: "1.0.0",
    icon: "/static/joystick.png", // Category icon
    color: "#F39C12", // Category color
    blocks: [ // Blocks in Category
            {
              // Section label in the toolbox (Originally: 【設計網頁介面區】)
              xml: '<label text="[Design Web Interface Area]"></label>',
            },  
            "html_tile",
            "html_table",
            "html_progress",
            "html_button",
            "html_slider_grid",
            "html_slider",
            "html_togglesw",
            "html_label",
            "html_image",
            "html_joystick",
            "html_two_joystick",
            "html_line",
            {
              // Section label in the toolbox (Originally: 【接收網頁訊息區】)
              xml: '<label text="[Receive Web Message Area]"></label>',
            },  
            "text",      
            "web_onpath_handlecmd",
            "args_getkey",
            "args_getvalue",
            "args_get_s_joystick_value",
            "args_get_d_joystick_value",
            {
             xml: `
                 <block type="joystick_direction">
                     <value name="clk">
                         <shadow type="math_number">
                             <field name="NUM">26</field>
                         </shadow>
                     </value>
                     <value name="dio">
                         <shadow type="math_number">
                             <field name="NUM">25</field>
                         </shadow>
                     </value>
                 </block>
             `
         },
    ]
});
