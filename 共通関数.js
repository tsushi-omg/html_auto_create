
//マウス座標常時取得*********************************************************************************************************************************
document.addEventListener('mousemove', function(event){
    // マウスの座標を取得
    const x = event.clientX;
    const y = event.clientY;
    document.getElementById('test').textContent=("("+ x +"," + y + ")");
    document.getElementById('test').classList.add('under_line');
});

// //明細　追加ボタン隠す

// var for_add_hide = 0;
// function add_button_hide(){
//     for_add_hide++;
// }

// setInterval(() => {
//     if(for_add_hide % 2 != 0){
//         if(ducument.getElementById('add_row_button1')){
//             var button = ducument.getElementById('add_row_button1');
//             alert(button);
//         }
//     }
// }, 100);

//move button　大きさ固定********************************************************

setInterval(() => {
    if(document.getElementById('move_button1')){
        var button = document.getElementById('move_button1');
        button.style.height = "15px";
        button.style.width = "15px";
    }
}, 10);

setInterval(() => {
    if(document.getElementById('move_button2')){
        var button = document.getElementById('move_button2');
        button.style.height = "15px";
        button.style.width = "15px";
    }
}, 10);


//要素作成系****************************************************************************************************************************

//ラベル押下（追加）
var count_label = 0;
function add_label(){
    if(count_label<10){
        const edit_area = document.getElementById("edit_area");
        const textarea = document.createElement("textarea");
        count_label ++;
        textarea.id = "label"+count_label;//動的にIDを作成
        textarea.classList.add('label_area');
        textarea.classList.add('for_label');
        textarea.classList.add('no_select');
        textarea.style.zIndex=2;
        // textarea.disabled = true;
        edit_area.appendChild(textarea); 
    }else if(count_label==10){
        const button_label = document.getElementById('button_label');
        button_label.textContent="売り切れ";
    }
    
}

//テキストボックス押下（追加）
var count_textbox = 0;
function add_textbox(){
    if(count_textbox < 10){
        const edit_area = document.getElementById("edit_area");
        const textarea = document.createElement("textarea");
        count_textbox ++;
        textarea.id = "textbox"+count_textbox;//動的にIDを作成
        textarea.classList.add('label_area');
        textarea.classList.add('for_textbox');
        textarea.classList.add('no_select');
        textarea.style.zIndex=2;
        edit_area.appendChild(textarea); 
    }else if(count_textbox==10){
        const button_textbox = document.getElementById('button_textbox');
        button_textbox.textContent="売り切れ";
    }
}

//ラジオ押下（追加）※デフォルトで要素を２個作る関数
var count_radio_parent = 0; //グループ数
let radio_map = new Map();//（グループ番号，要素数）
var count_in_x = 0; //グループ内x要素数
function add_radio(){
    if(count_radio_parent < 4){
        count_radio_parent ++;
        radio_map.set(count_radio_parent,2);
        const edit_area = document.getElementById("edit_area");
        const textarea1 = document.createElement("textarea");
        const textarea2 = document.createElement("textarea");
        textarea1.id = "radio"+count_radio_parent + "_" + "1";//動的にIDを作成 例,radio1_1
        textarea2.id = "radio"+count_radio_parent + "_" + "2";//動的にIDを作成
        textarea1.classList.add('label_area');//共通
        textarea2.classList.add('label_area');//共通
        textarea1.classList.add('for_radio');
        textarea2.classList.add('for_radio');
        textarea1.classList.add('no_select');
        textarea2.classList.add('no_select');
        textarea1.style.boxSizing = "border-box";
        textarea2.style.boxSizing = "border-box";
        textarea1.style.zIndex=2;
        textarea2.style.zIndex=2;
        // textarea.disabled = true;
        edit_area.appendChild(textarea1);
        edit_area.appendChild(textarea2);
        textarea2.style.top = 250 + "px"; //生成位置をズラす
        radio1_plus(count_radio_parent);
        custom_border(count_radio_parent);
    }else if(count_radio_parent == 4){
        const button_radio = document.getElementById('button_radio');
        button_radio.textContent="売り切れ";
    }
}

//＋ボタン作成＆初期位置設定用　共通
function radio1_plus(group_number){ //初期数でなく動的に対応。グループ番号を引数に取る
    const edit_area = document.getElementById("edit_area");
    const button = document.createElement("button");
    button.id = "plus_button"+group_number; //idのタイプはplus_button1みたいな感じ（グループ番号ごとの連番）
    button.textContent = "＋";
    button.classList.add('no_select');
    edit_area.appendChild(button);
    const last_radio = document.getElementById("radio"+group_number+"_"+2)
    const rect = last_radio.getBoundingClientRect(); // 要素の座標を取得
    //要素の座標を格納
    const right = rect.right;//右
    const top = rect.top;//上
    button.style.left=right+"px";
    button.style.top=top+"px";
    //＋ボタン位置調整
    move_plus(group_number);
    //＋ボタン押下時
    button.addEventListener("click", function() { //動的に作成されたタイミングでクリックイベントを作成
        if(radio_map.get(group_number) < 8 ){
        const rect = button.getBoundingClientRect(); // 要素の座標を取得
        const right = rect.right;//右
        const top = rect.top;//上
        const edit_area = document.getElementById("edit_area");
        const new_textarea = document.createElement("textarea");
        new_textarea.classList.add('label_area');//共通
        new_textarea.classList.add('for_radio');
        new_textarea.classList.add('no_select');
        new_textarea.style.boxSizing = "border-box";
        edit_area.appendChild(new_textarea);
        //要素数+1
        var countx = radio_map.get(group_number);
        countx ++;
        radio_map.set(group_number,countx);
        var new_countx = radio_map.get(group_number);
        new_textarea.id="radio" + group_number + "_" + new_countx; //value更新後に最新の値を再取得してIDに設定
        new_textarea.style.top = top + "px";
        new_textarea.style.left = right+43 + "px";//ボタンの幅くらいの空白（なくてもいいが）
        new_textarea.style.zIndex=2;
        custom_border(group_number);
        }else if(radio_map.get(group_number) == 8 ){
            button.textContent="売り切れ";
        }
    });
};

//＋ボタン 動的位置調整
function move_plus(group_number){ //最大数と位置の更新動作　ok
    setInterval(() => {//要素数の最大値を取得し，それがidに含まれている要素の座標を取得し，その右に配置し続ける
    var countx = radio_map.get(group_number);//該当グループの要素数を格納
    var button = document.getElementById("plus_button" + group_number);
    var last_radio = document.getElementById("radio"+group_number+"_"+countx); //該当グループの最後に作られたラジオボタン
    // alert("radio"+group_number+"_"+countx);
    const rect = last_radio.getBoundingClientRect(); // 要素の座標を取得
    //要素の座標を格納
    const right = rect.right;//右
    const top = rect.top;//上
    button.style.left=right+"px";
    button.style.top=top+"px";
}, 10);
}

//グループごとにborder色分け
function custom_border(group_number){
    //1
    if(group_number==1){
        if(document.getElementById("radio" + group_number + "_" + "1")){
            document.getElementById("radio" + group_number +"_" + "1").classList.add('border_11');
        }
        if(document.getElementById("radio" + group_number + "_" + "2")){
            document.getElementById("radio" + group_number +"_" + "2").classList.add('border_1');
        }
        if(document.getElementById("radio" + group_number + "_" + "3")){
            document.getElementById("radio" + group_number +"_" + "3").classList.add('border_1');
        }
        if(document.getElementById("radio" + group_number + "_" + "4")){
            document.getElementById("radio" + group_number +"_" + "4").classList.add('border_1');
        }
        if(document.getElementById("radio" + group_number + "_" + "5")){
            document.getElementById("radio" + group_number +"_" + "5").classList.add('border_1');
        }
        if(document.getElementById("radio" + group_number + "_" + "6")){
            document.getElementById("radio" + group_number +"_" + "6").classList.add('border_1');
        }
        if(document.getElementById("radio" + group_number + "_" + "7")){
            document.getElementById("radio" + group_number +"_" + "7").classList.add('border_1');
        }
        if(document.getElementById("radio" + group_number + "_" + "8")){
            document.getElementById("radio" + group_number +"_" + "8").classList.add('border_1');
        }
    }
    //2
    if(group_number == 2){
        if(document.getElementById("radio" + group_number + "_" + "1")){
            document.getElementById("radio" + group_number +"_" + "1").classList.add('border_22');
        }
        if(document.getElementById("radio" + group_number + "_" + "2")){
            document.getElementById("radio" + group_number +"_" + "2").classList.add('border_2');
        }
        if(document.getElementById("radio" + group_number + "_" + "3")){
            document.getElementById("radio" + group_number +"_" + "3").classList.add('border_2');
        }
        if(document.getElementById("radio" + group_number + "_" + "4")){
            document.getElementById("radio" + group_number +"_" + "4").classList.add('border_2');
        }
        if(document.getElementById("radio" + group_number + "_" + "5")){
            document.getElementById("radio" + group_number +"_" + "5").classList.add('border_2');
        }
        if(document.getElementById("radio" + group_number + "_" + "6")){
            document.getElementById("radio" + group_number +"_" + "6").classList.add('border_2');
        }
        if(document.getElementById("radio" + group_number + "_" + "7")){
            document.getElementById("radio" + group_number +"_" + "7").classList.add('border_2');
        }
        if(document.getElementById("radio" + group_number + "_" + "8")){
            document.getElementById("radio" + group_number +"_" + "8").classList.add('border_2');
        }
    }
    //3
    if(group_number==3){
        if(document.getElementById("radio" + group_number + "_" + "1")){
            document.getElementById("radio" + group_number +"_" + "1").classList.add('border_33');
        }
        if(document.getElementById("radio" + group_number + "_" + "2")){
            document.getElementById("radio" + group_number +"_" + "2").classList.add('border_3');
        }
        if(document.getElementById("radio" + group_number + "_" + "3")){
            document.getElementById("radio" + group_number +"_" + "3").classList.add('border_3');
        }
        if(document.getElementById("radio" + group_number + "_" + "4")){
            document.getElementById("radio" + group_number +"_" + "4").classList.add('border_3');
        }
        if(document.getElementById("radio" + group_number + "_" + "5")){
            document.getElementById("radio" + group_number +"_" + "5").classList.add('border_3');
        }
        if(document.getElementById("radio" + group_number + "_" + "6")){
            document.getElementById("radio" + group_number +"_" + "6").classList.add('border_3');
        }
        if(document.getElementById("radio" + group_number + "_" + "7")){
            document.getElementById("radio" + group_number +"_" + "7").classList.add('border_3');
        }
        if(document.getElementById("radio" + group_number + "_" + "8")){
            document.getElementById("radio" + group_number +"_" + "8").classList.add('border_3');
        }
    }
    //4
    if(group_number == 4){
        if(document.getElementById("radio" + group_number + "_" + "1")){
            document.getElementById("radio" + group_number +"_" + "1").classList.add('border_44');
        }
        if(document.getElementById("radio" + group_number + "_" + "2")){
            document.getElementById("radio" + group_number +"_" + "2").classList.add('border_4');
        }
        if(document.getElementById("radio" + group_number + "_" + "3")){
            document.getElementById("radio" + group_number +"_" + "3").classList.add('border_4');
        }
        if(document.getElementById("radio" + group_number + "_" + "4")){
            document.getElementById("radio" + group_number +"_" + "4").classList.add('border_4');
        }
        if(document.getElementById("radio" + group_number + "_" + "5")){
            document.getElementById("radio" + group_number +"_" + "5").classList.add('border_4');
        }
        if(document.getElementById("radio" + group_number + "_" + "6")){
            document.getElementById("radio" + group_number +"_" + "6").classList.add('border_4');
        }
        if(document.getElementById("radio" + group_number + "_" + "7")){
            document.getElementById("radio" + group_number +"_" + "7").classList.add('border_4');
        }
        if(document.getElementById("radio" + group_number + "_" + "8")){
            document.getElementById("radio" + group_number +"_" + "8").classList.add('border_4');
        }
    }
}
    


//コマンドボタン押下（追加）
var count_command = 0;
function add_command(){
    if(count_command<10){
        const edit_area = document.getElementById("edit_area");
        const textarea = document.createElement("textarea");
        count_command ++;
        textarea.id = "command"+count_command;//動的にIDを作成
        textarea.classList.add('command_area');
        textarea.classList.add('for_command');
        textarea.classList.add('no_select');
        textarea.style.zIndex=2;
        // textarea.disabled = true;
        edit_area.appendChild(textarea); 
    }else if(count_command==10){
        const button_command = document.getElementById('button_command');
        button_command.textContent="売り切れ";
    }
    
}

//明細押下（追加）
let count_th_map = new Map();//(テーブル番号,ヘッダー数)
let count_row_map = new Map();//(テーブル番号,行数)
var count_table = 0; //テーブル数をカウント

function add_table(){
    if(count_table < 1){
        count_table ++;
        const edit_area = document.getElementById("edit_area");
        //move_button
        const move_button = document.createElement("textarea");
        move_button.textContent="✜";
        move_button.style.height="15px";
        move_button.style.width="15px";
        move_button.id="move_button"+count_table;
        move_button.style.resize="none";
        move_button.classList.add('no_select');
        edit_area.appendChild(move_button);
        //th部作成
        const th1 = document.createElement("textarea");
        const th2 = document.createElement("textarea");
        th1.id = "table"+count_table+"_th1";//動的にIDを作成 例,table1_th1
        th2.id = "table"+count_table+"_th2";//動的にIDを作成 例,table1_th1
        th1.classList.add('label_area');//共通
        th2.classList.add('label_area');//共通
        th1.classList.add('for_table');
        th2.classList.add('for_table');
        th1.classList.add('no_select');
        th2.classList.add('no_select');
        th1.style.boxSizing = "border-box";
        th2.style.boxSizing = "border-box";
        edit_area.appendChild(th1);
        edit_area.appendChild(th2);
        count_th_map.set(count_table,2);//デフォルト値の設定（列２）
        const rect = th1.getBoundingClientRect();
        const th1_x_right = rect.right;//右
        const th1_x_left = rect.left;//右
        const th1_x_top = rect.top;//上
        th2.style.left = th1_x_right + "px";
        th2.style.top = th1_x_top + "px";
        th1.style.zIndex=2;
        th2.style.zIndex=2;
        move_button.style.left=th1_x_left+"px";    
        move_button.style.top=(th1_x_top-35)+"px";    
        //td部作成
        const td1 = document.createElement("textarea");
        const td2 = document.createElement("textarea");
        td1.id = "table"+count_table+"_th1_row1";//動的にIDを作成 例,table1_th_row1
        td2.id = "table"+count_table+"_th2_row1";//動的にIDを作成 例,table1_th2_row1
        td1.classList.add('label_area');//共通
        td2.classList.add('label_area');//共通
        td1.classList.add('for_table_data');
        td2.classList.add('for_table_data');
        td1.classList.add('no_select');
        td2.classList.add('no_select');
        td1.style.boxSizing = "border-box";
        td2.style.boxSizing = "border-box";
        td1.style.zIndex=2;
        td2.style.zIndex=2;
        edit_area.appendChild(td1);
        edit_area.appendChild(td2);
        count_row_map.set(count_table,1); //デフォルト値の設定（行１）
            //td1の初期位置
            const rect_td1 = th1.getBoundingClientRect();
            const td1_x_left = rect_td1.left;//左
            const td1_x_bottom = rect_td1.bottom;//下
            td1.style.left = td1_x_left + "px";
            td1.style.top = td1_x_bottom + "px";
            //td2の初期位置
            const rect_td2 = th2.getBoundingClientRect();
            const td2_x_left = rect_td2.left;//左
            const td2_x_bottom = rect_td2.bottom;//下
            td2.style.left = td2_x_left + "px";
            td2.style.top = td2_x_bottom + "px";
        //行追加ボタン作成＆初期位置
        const add_row_button = document.createElement("button");
        add_row_button.id= "add_row_button" + count_table; //例，add_row_button1
        add_row_button.textContent="行を追加 ↓ "
        add_row_button.classList.add('no_select');
        edit_area.appendChild(add_row_button);
        const rect_button = td1.getBoundingClientRect();
        const button_x_left = rect_button.left;//左
        const button_x_bottom = rect_button.bottom;//下
        add_row_button.style.left = button_x_left + "px";
        add_row_button.style.top = button_x_bottom + "px";
        //th追加ボタン作成＆初期位置
        const add_header_button = document.createElement("button");
        add_header_button.id= "add_header_button" + count_table; //例，add_header_button1
        add_header_button.textContent="列を追加 → "
        add_header_button.classList.add('no_select');
        edit_area.appendChild(add_header_button);
        const rect_button_header = th2.getBoundingClientRect();
        const button_header_x_right = rect_button_header.right;//左
        const button_header_x_top = rect_button_header.top;//下
        add_header_button.style.left = button_header_x_right + "px";
        add_header_button.style.top = button_header_x_top + "px";
         //列(th)追加ボタンクリックイベントを作成
         add_header_button.addEventListener("click", function() { //動的に作成されたタイミングでクリックイベントを作成
            if(count_th_map.get(count_table) < 6 ){
                //th数を更新
                var count_th_new = count_th_map.get(count_table)+1;
                count_th_map.set(count_table,count_th_new);
                //thを作成
                const new_th = document.createElement("textarea");
                new_th.id = "table"+count_table+"_th"+ count_th_new;//動的にIDを作成 ok. 例,table1_th3
                new_th.classList.add('label_area');
                new_th.classList.add('for_table');
                new_th.classList.add('no_select');
                new_th.style.boxSizing = "border-box";
                new_th.style.zIndex=2;
                edit_area.appendChild(new_th);
                //動的に位置を指定
                var count_th_new_data = document.getElementById("table"+count_table+"_th"+ (count_th_new-1));//一つ左のthを取得
                const rect_new_th = count_th_new_data.getBoundingClientRect();
                const new_th_x_right= rect_new_th.right;//右
                const new_th_x_top = rect_new_th.top;//下
                new_th.style.left = new_th_x_right + "px";
                new_th.style.top = new_th_x_top + "px";
                //  追加ボタンの位置を更新
                const rect_button_new_header = new_th.getBoundingClientRect();
                const button_new_header_x_right = rect_button_new_header.right;//左
                const button_new_header_x_top = rect_button_new_header.top;//下
                add_header_button.style.left = button_new_header_x_right + "px";
                add_header_button.style.top = button_new_header_x_top + "px";
                //tdを作成
                var last_row = count_row_map.get(count_table);
                for(let i = 1; i <= last_row; i++){
                const new_td = document.createElement("textarea");
                new_td.id = "table"+count_table+"_th"+ count_th_new+"_row"+i;//動的にIDを作成 ok. 例,table_th3_row1
                new_td.classList.add('label_area');
                new_td.classList.add('for_table_data');
                new_td.classList.add('no_select');
                new_td.style.boxSizing = "border-box";
                new_td.style.zIndex=2;
                edit_area.appendChild(new_td);
                //動的に位置を指定
                var last_td_data = document.getElementById("table"+count_table+"_th"+(count_th_new-1)+"_row"+i);
                const rect_new_td = last_td_data.getBoundingClientRect();
                const a_right= rect_new_td.right;//右
                const b_top = rect_new_td.top;//下
                new_td.style.left = a_right + "px";
                new_td.style.top = b_top + "px";
                }
            }else if(count_th_map.get(count_table) == 6 ){
                    var button = document.getElementById("add_header_button" + count_table);
                    button.textContent="売り切れ";
            } 
        });
        //行追加ボタンクリックイベント作成
        add_row_button.addEventListener("click", function() { //動的に作成されたタイミングでクリックイベントを作成
            if(count_row_map.get(count_table) < 8 ){
                //行数を更新
                var count_row_new = count_row_map.get(count_table)+1;
                count_row_map.set(count_table,count_row_new);
                var count_th = count_th_map.get(count_table);
                for(let i = 1; i <= count_th; i++){
                    //tdを作成
                    const new_td = document.createElement("textarea");
                    new_td.classList.add('label_area');
                    new_td.classList.add('for_table_data');
                    new_td.classList.add('no_select');
                    new_td.id=("table"+count_table+"_th"+i+"_row"+count_row_new);//例，table1_th1_row1
                    new_td.style.boxSizing = "border-box";
                    new_td.style.zIndex=2;
                    edit_area.appendChild(new_td);
                    //位置を設定
                    const td = document.getElementById("table"+count_table+"_th"+i+"_row"+(count_row_new-1));//一つ上の行のtdを取得
                    var rect_td = td.getBoundingClientRect();
                    var td_bottom = rect_td.bottom;
                    var td_left = rect_td.left;
                    new_td.style.top = td_bottom + "px";
                    new_td.style.left = td_left + "px";
                    //  追加ボタンの位置を更新
                    const tdx = document.getElementById("table"+count_table+"_th1_row"+count_row_new);//一番左のtdを取得
                    const rect_tdx = tdx.getBoundingClientRect();
                    var tdx_bottom = rect_tdx.bottom;
                    var tdx_left = rect_tdx.left;
                    add_row_button.style.top=tdx_bottom+"px";
                    add_row_button.style.left=tdx_left+"px";
                }
            }else if(count_row_map.get(count_table) == 8 ){
                    var button = document.getElementById("add_row_button" + count_table);
                    button.textContent="売り切れ";
            } 
        });
        if(count_table == 1){
            const button_table = document.getElementById('button_table');
            button_table.textContent="売り切れ";
        }
    }
};

//動的移動系******************************************（ラベル）**********************************************************************************

//ラベル1*********************************************

    var judge_label1 = "false"; //マウス座標が要素内にあれば"true"
    var move_label1 = "false"; //judge_label1がtrueのときに要素をクリックしたら"true"
    document.addEventListener('mousemove', function(event){
        // マウスの座標を取得
        const x = event.clientX;
        const y = event.clientY;
        if(document.getElementById('label1')){//id=label1が存在するとき
            const label1 = document.getElementById('label1');
            const rect = label1.getBoundingClientRect(); // 要素の座標を取得
            //要素の座標を格納
            const label_x_left = rect.left;//左
            const label_x_right = rect.right-25;//右 ※ズームボタン考慮
            const label_y_top = rect.top;//上
            const label_y_bottom = rect.bottom;//下 ※ボトム
            const label_width = (rect.right - rect.left)/2; //要素の横幅の半分
            const label_height = (rect.bottom - rect.top)/2; //要素の縦幅の半分　※これで中心に来る
            if(x >= label_x_left && x <= label_x_right && y <= label_y_bottom && y >= label_y_top){//マウス座標が要素内にあれば
                judge_label1="true";
                label1.addEventListener('click',function(){
                    move_label1 = "true";//ok
                    label1.classList.add('label_move');
                });
                document.addEventListener('mousemove',function(){
                    if(move_label1 == "true"){
                        label1.style.left = x-label_width+`px`;
                        label1.style.top = y-label_height+`px`;
                        label1.addEventListener('click',function(){
                            move_label1 = "false";//ok
                            label1.classList.remove('label_move');
                        });
                    }
                });
            }else{
                judge_label1="false";//ok
            }
        }
    });

//ラベル2*********************************************

    var judge_label2 = "false"; //マウス座標が要素内にあれば"true"
    var move_label2 = "false"; //judge_label2がtrueのときに要素をクリックしたら"true"
    document.addEventListener('mousemove', function(event){
        // マウスの座標を取得
        const x = event.clientX;
        const y = event.clientY;
        if(document.getElementById('label2')){//id=label2が存在するとき
            const label2 = document.getElementById('label2');
            const rect = label2.getBoundingClientRect(); // 要素の座標を取得
            //要素の座標を格納
            const label_x_left = rect.left;//左
            const label_x_right = rect.right-25;//右 ※ズームボタン考慮
            const label_y_top = rect.top;//上
            const label_y_bottom = rect.bottom;//下 ※ボトム
            const label_width = (rect.right - rect.left)/2; //要素の横幅の半分
            const label_height = (rect.bottom - rect.top)/2; //要素の縦幅の半分　※これで中心に来る
            if(x >= label_x_left && x <= label_x_right && y <= label_y_bottom && y >= label_y_top){//マウス座標が要素内にあれば
                judge_label2="true";
                label2.addEventListener('click',function(){
                    move_label2 = "true";//ok
                    label2.classList.add('label_move');
                });
                document.addEventListener('mousemove',function(){
                    if(move_label2 == "true"){
                        label2.style.left = x-label_width+`px`;
                        label2.style.top = y-label_height+`px`;
                        label2.addEventListener('click',function(){
                            move_label2 = "false";//ok
                            label2.classList.remove('label_move');
                        });
                    }
                });
            }else{
                judge_label2="false";//ok
            }
        }
    });

//ラベル3*********************************************

var judge_label3 = "false"; //マウス座標が要素内にあれば"true"
var move_label3 = "false"; //judge_label3がtrueのときに要素をクリックしたら"true"
document.addEventListener('mousemove', function(event){
    // マウスの座標を取得
    const x = event.clientX;
    const y = event.clientY;
    if(document.getElementById('label3')){//id=label3が存在するとき
        const label3 = document.getElementById('label3');
        const rect = label3.getBoundingClientRect(); // 要素の座標を取得
        //要素の座標を格納
        const label_x_left = rect.left;//左
        const label_x_right = rect.right-25;//右 ※ズームボタン考慮
        const label_y_top = rect.top;//上
        const label_y_bottom = rect.bottom;//下 ※ボトム
        const label_width = (rect.right - rect.left)/2; //要素の横幅の半分
        const label_height = (rect.bottom - rect.top)/2; //要素の縦幅の半分　※これで中心に来る
        if(x >= label_x_left && x <= label_x_right && y <= label_y_bottom && y >= label_y_top){//マウス座標が要素内にあれば
            judge_label3="true";
            label3.addEventListener('click',function(){
                move_label3 = "true";//ok
                label3.classList.add('label_move');
            });
            document.addEventListener('mousemove',function(){
                if(move_label3 == "true"){
                    label3.style.left = x-label_width+`px`;
                    label3.style.top = y-label_height+`px`;
                    label3.addEventListener('click',function(){
                        move_label3 = "false";//ok
                        label3.classList.remove('label_move');
                    });
                }
            });
        }else{
            judge_label3="false";//ok
        }
    }
});

//ラベル4*********************************************

var judge_label4 = "false"; //マウス座標が要素内にあれば"true"
var move_label4 = "false"; //judge_label4がtrueのときに要素をクリックしたら"true"
document.addEventListener('mousemove', function(event){
    // マウスの座標を取得
    const x = event.clientX;
    const y = event.clientY;
    if(document.getElementById('label4')){//id=label4が存在するとき
        const label4 = document.getElementById('label4');
        const rect = label4.getBoundingClientRect(); // 要素の座標を取得
        //要素の座標を格納
        const label_x_left = rect.left;//左
        const label_x_right = rect.right-25;//右 ※ズームボタン考慮
        const label_y_top = rect.top;//上
        const label_y_bottom = rect.bottom;//下 ※ボトム
        const label_width = (rect.right - rect.left)/2; //要素の横幅の半分
        const label_height = (rect.bottom - rect.top)/2; //要素の縦幅の半分　※これで中心に来る
        if(x >= label_x_left && x <= label_x_right && y <= label_y_bottom && y >= label_y_top){//マウス座標が要素内にあれば
            judge_label4="true";
            label4.addEventListener('click',function(){
                move_label4 = "true";//ok
                label4.classList.add('label_move');
            });
            document.addEventListener('mousemove',function(){
                if(move_label4 == "true"){
                    label4.style.left = x-label_width+`px`;
                    label4.style.top = y-label_height+`px`;
                    label4.addEventListener('click',function(){
                        move_label4 = "false";//ok
                        label4.classList.remove('label_move');
                    });
                }
            });
        }else{
            judge_label4="false";//ok
        }
    }
});

//ラベル5*********************************************

var judge_label5 = "false"; //マウス座標が要素内にあれば"true"
var move_label5 = "false"; //judge_label5がtrueのときに要素をクリックしたら"true"
document.addEventListener('mousemove', function(event){
    // マウスの座標を取得
    const x = event.clientX;
    const y = event.clientY;
    if(document.getElementById('label5')){//id=label5が存在するとき
        const label5 = document.getElementById('label5');
        const rect = label5.getBoundingClientRect(); // 要素の座標を取得
        //要素の座標を格納
        const label_x_left = rect.left;//左
        const label_x_right = rect.right-25;//右 ※ズームボタン考慮
        const label_y_top = rect.top;//上
        const label_y_bottom = rect.bottom;//下 ※ボトム
        const label_width = (rect.right - rect.left)/2; //要素の横幅の半分
        const label_height = (rect.bottom - rect.top)/2; //要素の縦幅の半分　※これで中心に来る
        if(x >= label_x_left && x <= label_x_right && y <= label_y_bottom && y >= label_y_top){//マウス座標が要素内にあれば
            judge_label5="true";
            label5.addEventListener('click',function(){
                move_label5 = "true";//ok
                label5.classList.add('label_move');
            });
            document.addEventListener('mousemove',function(){
                if(move_label5 == "true"){
                    label5.style.left = x-label_width+`px`;
                    label5.style.top = y-label_height+`px`;
                    label5.addEventListener('click',function(){
                        move_label5 = "false";//ok
                        label5.classList.remove('label_move');
                    });
                }
            });
        }else{
            judge_label5="false";//ok
        }
    }
});

//ラベル6*********************************************

var judge_label6 = "false"; //マウス座標が要素内にあれば"true"
var move_label6 = "false"; //judge_label6がtrueのときに要素をクリックしたら"true"
document.addEventListener('mousemove', function(event){
    // マウスの座標を取得
    const x = event.clientX;
    const y = event.clientY;
    if(document.getElementById('label6')){//id=label6が存在するとき
        const label6 = document.getElementById('label6');
        const rect = label6.getBoundingClientRect(); // 要素の座標を取得
        //要素の座標を格納
        const label_x_left = rect.left;//左
        const label_x_right = rect.right-25;//右 ※ズームボタン考慮
        const label_y_top = rect.top;//上
        const label_y_bottom = rect.bottom;//下 ※ボトム
        const label_width = (rect.right - rect.left)/2; //要素の横幅の半分
        const label_height = (rect.bottom - rect.top)/2; //要素の縦幅の半分　※これで中心に来る
        if(x >= label_x_left && x <= label_x_right && y <= label_y_bottom && y >= label_y_top){//マウス座標が要素内にあれば
            judge_label6="true";
            label6.addEventListener('click',function(){
                move_label6 = "true";//ok
                label6.classList.add('label_move');
            });
            document.addEventListener('mousemove',function(){
                if(move_label6 == "true"){
                    label6.style.left = x-label_width+`px`;
                    label6.style.top = y-label_height+`px`;
                    label6.addEventListener('click',function(){
                        move_label6 = "false";//ok
                        label6.classList.remove('label_move');
                    });
                }
            });
        }else{
            judge_label6="false";//ok
        }
    }
});

//ラベル7*********************************************

var judge_label7 = "false"; //マウス座標が要素内にあれば"true"
var move_label7 = "false"; //judge_label7がtrueのときに要素をクリックしたら"true"
document.addEventListener('mousemove', function(event){
    // マウスの座標を取得
    const x = event.clientX;
    const y = event.clientY;
    if(document.getElementById('label7')){//id=label7が存在するとき
        const label7 = document.getElementById('label7');
        const rect = label7.getBoundingClientRect(); // 要素の座標を取得
        //要素の座標を格納
        const label_x_left = rect.left;//左
        const label_x_right = rect.right-25;//右 ※ズームボタン考慮
        const label_y_top = rect.top;//上
        const label_y_bottom = rect.bottom;//下 ※ボトム
        const label_width = (rect.right - rect.left)/2; //要素の横幅の半分
        const label_height = (rect.bottom - rect.top)/2; //要素の縦幅の半分　※これで中心に来る
        if(x >= label_x_left && x <= label_x_right && y <= label_y_bottom && y >= label_y_top){//マウス座標が要素内にあれば
            judge_label7="true";
            label7.addEventListener('click',function(){
                move_label7 = "true";//ok
                label7.classList.add('label_move');
            });
            document.addEventListener('mousemove',function(){
                if(move_label7 == "true"){
                    label7.style.left = x-label_width+`px`;
                    label7.style.top = y-label_height+`px`;
                    label7.addEventListener('click',function(){
                        move_label7 = "false";//ok
                        label7.classList.remove('label_move');
                    });
                }
            });
        }else{
            judge_label7="false";//ok
        }
    }
});

//ラベル8*********************************************

var judge_label8 = "false"; //マウス座標が要素内にあれば"true"
var move_label8 = "false"; //judge_label8がtrueのときに要素をクリックしたら"true"
document.addEventListener('mousemove', function(event){
    // マウスの座標を取得
    const x = event.clientX;
    const y = event.clientY;
    if(document.getElementById('label8')){//id=label8が存在するとき
        const label8 = document.getElementById('label8');
        const rect = label8.getBoundingClientRect(); // 要素の座標を取得
        //要素の座標を格納
        const label_x_left = rect.left;//左
        const label_x_right = rect.right-25;//右 ※ズームボタン考慮
        const label_y_top = rect.top;//上
        const label_y_bottom = rect.bottom;//下 ※ボトム
        const label_width = (rect.right - rect.left)/2; //要素の横幅の半分
        const label_height = (rect.bottom - rect.top)/2; //要素の縦幅の半分　※これで中心に来る
        if(x >= label_x_left && x <= label_x_right && y <= label_y_bottom && y >= label_y_top){//マウス座標が要素内にあれば
            judge_label8="true";
            label8.addEventListener('click',function(){
                move_label8 = "true";//ok
                label8.classList.add('label_move');
            });
            document.addEventListener('mousemove',function(){
                if(move_label8 == "true"){
                    label8.style.left = x-label_width+`px`;
                    label8.style.top = y-label_height+`px`;
                    label8.addEventListener('click',function(){
                        move_label8 = "false";//ok
                        label8.classList.remove('label_move');
                    });
                }
            });
        }else{
            judge_label8="false";//ok
        }
    }
});

//ラベル9*********************************************

var judge_label9 = "false"; //マウス座標が要素内にあれば"true"
var move_label9 = "false"; //judge_label9がtrueのときに要素をクリックしたら"true"
document.addEventListener('mousemove', function(event){
    // マウスの座標を取得
    const x = event.clientX;
    const y = event.clientY;
    if(document.getElementById('label9')){//id=label9が存在するとき
        const label9 = document.getElementById('label9');
        const rect = label9.getBoundingClientRect(); // 要素の座標を取得
        //要素の座標を格納
        const label_x_left = rect.left;//左
        const label_x_right = rect.right-25;//右 ※ズームボタン考慮
        const label_y_top = rect.top;//上
        const label_y_bottom = rect.bottom;//下 ※ボトム
        const label_width = (rect.right - rect.left)/2; //要素の横幅の半分
        const label_height = (rect.bottom - rect.top)/2; //要素の縦幅の半分　※これで中心に来る
        if(x >= label_x_left && x <= label_x_right && y <= label_y_bottom && y >= label_y_top){//マウス座標が要素内にあれば
            judge_label9="true";
            label9.addEventListener('click',function(){
                move_label9 = "true";//ok
                label9.classList.add('label_move');
            });
            document.addEventListener('mousemove',function(){
                if(move_label9 == "true"){
                    label9.style.left = x-label_width+`px`;
                    label9.style.top = y-label_height+`px`;
                    label9.addEventListener('click',function(){
                        move_label9 = "false";//ok
                        label9.classList.remove('label_move');
                    });
                }
            });
        }else{
            judge_label9="false";//ok
        }
    }
});

//ラベル10*********************************************

var judge_label10 = "false"; //マウス座標が要素内にあれば"true"
var move_label10 = "false"; //judge_label10がtrueのときに要素をクリックしたら"true"
document.addEventListener('mousemove', function(event){
    // マウスの座標を取得
    const x = event.clientX;
    const y = event.clientY;
    if(document.getElementById('label10')){//id=label10が存在するとき
        const label10 = document.getElementById('label10');
        const rect = label10.getBoundingClientRect(); // 要素の座標を取得
        //要素の座標を格納
        const label_x_left = rect.left;//左
        const label_x_right = rect.right-25;//右 ※ズームボタン考慮
        const label_y_top = rect.top;//上
        const label_y_bottom = rect.bottom;//下 ※ボトム
        const label_width = (rect.right - rect.left)/2; //要素の横幅の半分
        const label_height = (rect.bottom - rect.top)/2; //要素の縦幅の半分　※これで中心に来る
        if(x >= label_x_left && x <= label_x_right && y <= label_y_bottom && y >= label_y_top){//マウス座標が要素内にあれば
            judge_label10="true";
            label10.addEventListener('click',function(){
                move_label10 = "true";//ok
                label10.classList.add('label_move');
            });
            document.addEventListener('mousemove',function(){
                if(move_label10 == "true"){
                    label10.style.left = x-label_width+`px`;
                    label10.style.top = y-label_height+`px`;
                    label10.addEventListener('click',function(){
                        move_label10 = "false";//ok
                        label10.classList.remove('label_move');
                    });
                }
            });
        }else{
            judge_label10="false";//ok
        }
    }
});

//*******フォントサイズ動的変更******************************************（ラベル）**********************************************************************************

//ラベル1用
var label1_height_log = 0;//履歴用
var label1_font = 22; //初期値固定フォントサイズ（可変）
setInterval(() => {
    if(document.getElementById('label1')){
        // alert("ok");//ok
        const label = document.getElementById('label1');
        const rect = label.getBoundingClientRect(); // 要素の座標を取得
        //要素の座標を格納
        const label_height = rect.bottom - rect.top;
        var last_heigth = label_height;//最後に検出したheightを格納
        label1_height_log++;//キー用のカウント
        label.style.fontSize = last_heigth-10 + "px";//heightの単位もpxなのでそのまま代入でいい（余白分10px）
    }
}, 10);

//ラベル2用
var label2_height_log = 0;//履歴用
var label2_font = 22; //初期値固定フォントサイズ（可変）
setInterval(() => {
    if(document.getElementById('label2')){
        // alert("ok");//ok
        const label = document.getElementById('label2');
        const rect = label.getBoundingClientRect(); // 要素の座標を取得
        //要素の座標を格納
        const label_height = rect.bottom - rect.top;
        var last_heigth = label_height;//最後に検出したheightを格納
        label2_height_log++;//キー用のカウント
        label.style.fontSize = last_heigth-10 + "px";//heightの単位もpxなのでそのまま代入でいい（余白分10px）
    }
}, 10);

//ラベル3用
var label3_height_log = 0;//履歴用
var label3_font = 22; //初期値固定フォントサイズ（可変）
setInterval(() => {
    if(document.getElementById('label3')){
        // alert("ok");//ok
        const label = document.getElementById('label3');
        const rect = label.getBoundingClientRect(); // 要素の座標を取得
        //要素の座標を格納
        const label_height = rect.bottom - rect.top;
        var last_heigth = label_height;//最後に検出したheightを格納
        label3_height_log++;//キー用のカウント
        label.style.fontSize = last_heigth-10 + "px";//heightの単位もpxなのでそのまま代入でいい（余白分10px）
    }
}, 10);

//ラベル4用
var label4_height_log = 0;//履歴用
var label4_font = 22; //初期値固定フォントサイズ（可変）
setInterval(() => {
    if(document.getElementById('label4')){
        // alert("ok");//ok
        const label = document.getElementById('label4');
        const rect = label.getBoundingClientRect(); // 要素の座標を取得
        //要素の座標を格納
        const label_height = rect.bottom - rect.top;
        var last_heigth = label_height;//最後に検出したheightを格納
        label4_height_log++;//キー用のカウント
        label.style.fontSize = last_heigth-10 + "px";//heightの単位もpxなのでそのまま代入でいい（余白分10px）
    }
}, 10);

//ラベル5用
var label5_height_log = 0;//履歴用
var label5_font = 22; //初期値固定フォントサイズ（可変）
setInterval(() => {
    if(document.getElementById('label5')){
        // alert("ok");//ok
        const label = document.getElementById('label5');
        const rect = label.getBoundingClientRect(); // 要素の座標を取得
        //要素の座標を格納
        const label_height = rect.bottom - rect.top;
        var last_heigth = label_height;//最後に検出したheightを格納
        label5_height_log++;//キー用のカウント
        label.style.fontSize = last_heigth-10 + "px";//heightの単位もpxなのでそのまま代入でいい（余白分10px）
    }
}, 10);

//ラベル6用
var label6_height_log = 0;//履歴用
var label6_font = 22; //初期値固定フォントサイズ（可変）
setInterval(() => {
    if(document.getElementById('label6')){
        // alert("ok");//ok
        const label = document.getElementById('label6');
        const rect = label.getBoundingClientRect(); // 要素の座標を取得
        //要素の座標を格納
        const label_height = rect.bottom - rect.top;
        var last_heigth = label_height;//最後に検出したheightを格納
        label6_height_log++;//キー用のカウント
        label.style.fontSize = last_heigth-10 + "px";//heightの単位もpxなのでそのまま代入でいい（余白分10px）
    }
}, 10);

//ラベル7用
var label7_height_log = 0;//履歴用
var label7_font = 22; //初期値固定フォントサイズ（可変）
setInterval(() => {
    if(document.getElementById('label7')){
        // alert("ok");//ok
        const label = document.getElementById('label7');
        const rect = label.getBoundingClientRect(); // 要素の座標を取得
        //要素の座標を格納
        const label_height = rect.bottom - rect.top;
        var last_heigth = label_height;//最後に検出したheightを格納
        label7_height_log++;//キー用のカウント
        label.style.fontSize = last_heigth-10 + "px";//heightの単位もpxなのでそのまま代入でいい（余白分10px）
    }
}, 10);

//ラベル8用
var label8_height_log = 0;//履歴用
var label8_font = 22; //初期値固定フォントサイズ（可変）
setInterval(() => {
    if(document.getElementById('label8')){
        // alert("ok");//ok
        const label = document.getElementById('label8');
        const rect = label.getBoundingClientRect(); // 要素の座標を取得
        //要素の座標を格納
        const label_height = rect.bottom - rect.top;
        var last_heigth = label_height;//最後に検出したheightを格納
        label8_height_log++;//キー用のカウント
        label.style.fontSize = last_heigth-10 + "px";//heightの単位もpxなのでそのまま代入でいい（余白分10px）
    }
}, 10);

//ラベル9用
var label9_height_log = 0;//履歴用
var label9_font = 22; //初期値固定フォントサイズ（可変）
setInterval(() => {
    if(document.getElementById('label9')){
        // alert("ok");//ok
        const label = document.getElementById('label9');
        const rect = label.getBoundingClientRect(); // 要素の座標を取得
        //要素の座標を格納
        const label_height = rect.bottom - rect.top;
        var last_heigth = label_height;//最後に検出したheightを格納
        label9_height_log++;//キー用のカウント
        label.style.fontSize = last_heigth-10 + "px";//heightの単位もpxなのでそのまま代入でいい（余白分10px）
    }
}, 10);

//ラベル10用
var label10_height_log = 0;//履歴用
var label10_font = 22; //初期値固定フォントサイズ（可変）
setInterval(() => {
    if(document.getElementById('label10')){
        // alert("ok");//ok
        const label = document.getElementById('label10');
        const rect = label.getBoundingClientRect(); // 要素の座標を取得
        //要素の座標を格納
        const label_height = rect.bottom - rect.top;
        var last_heigth = label_height;//最後に検出したheightを格納
        label10_height_log++;//キー用のカウント
        label.style.fontSize = last_heigth-10 + "px";//heightの単位もpxなのでそのまま代入でいい（余白分10px）
    }
}, 10);

//動的移動系******************************************（テキストボックス）**********************************************************************************

//テキストボックス1*********************************************

var judge_textbox1 = "false"; //マウス座標が要素内にあれば"true"
var move_textbox1 = "false"; //judge_textbox1がtrueのときに要素をクリックしたら"true"
document.addEventListener('mousemove', function(event){
    // マウスの座標を取得
    const x = event.clientX;
    const y = event.clientY;
    if(document.getElementById('textbox1')){//id=textbox1が存在するとき
        const textbox1 = document.getElementById('textbox1');
        const rect = textbox1.getBoundingClientRect(); // 要素の座標を取得
        //要素の座標を格納
        const textbox_x_left = rect.left;//左
        const textbox_x_right = rect.right-25;//右 ※ズームボタン考慮
        const textbox_y_top = rect.top;//上
        const textbox_y_bottom = rect.bottom;//下 ※ボトム
        const textbox_width = (rect.right - rect.left)/2; //要素の横幅の半分
        const textbox_height = (rect.bottom - rect.top)/2; //要素の縦幅の半分　※これで中心に来る
        if(x >= textbox_x_left && x <= textbox_x_right && y <= textbox_y_bottom && y >= textbox_y_top){//マウス座標が要素内にあれば
            judge_textbox1="true";
            textbox1.addEventListener('click',function(){
                move_textbox1 = "true";//ok
                textbox1.classList.add('textbox_move');
            });
            document.addEventListener('mousemove',function(){
                if(move_textbox1 == "true"){
                    textbox1.style.left = x-textbox_width+`px`;
                    textbox1.style.top = y-textbox_height+`px`;
                    textbox1.addEventListener('click',function(){
                        move_textbox1 = "false";//ok
                        textbox1.classList.remove('textbox_move');
                    });
                }
            });
        }else{
            judge_textbox1="false";//ok
        }
    }
});

//テキストボックス2*********************************************

var judge_textbox2 = "false"; //マウス座標が要素内にあれば"true"
var move_textbox2 = "false"; //judge_textbox2がtrueのときに要素をクリックしたら"true"
document.addEventListener('mousemove', function(event){
    // マウスの座標を取得
    const x = event.clientX;
    const y = event.clientY;
    if(document.getElementById('textbox2')){//id=textbox2が存在するとき
        const textbox2 = document.getElementById('textbox2');
        const rect = textbox2.getBoundingClientRect(); // 要素の座標を取得
        //要素の座標を格納
        const textbox_x_left = rect.left;//左
        const textbox_x_right = rect.right-25;//右 ※ズームボタン考慮
        const textbox_y_top = rect.top;//上
        const textbox_y_bottom = rect.bottom;//下 ※ボトム
        const textbox_width = (rect.right - rect.left)/2; //要素の横幅の半分
        const textbox_height = (rect.bottom - rect.top)/2; //要素の縦幅の半分　※これで中心に来る
        if(x >= textbox_x_left && x <= textbox_x_right && y <= textbox_y_bottom && y >= textbox_y_top){//マウス座標が要素内にあれば
            judge_textbox2="true";
            textbox2.addEventListener('click',function(){
                move_textbox2 = "true";//ok
                textbox2.classList.add('textbox_move');
            });
            document.addEventListener('mousemove',function(){
                if(move_textbox2 == "true"){
                    textbox2.style.left = x-textbox_width+`px`;
                    textbox2.style.top = y-textbox_height+`px`;
                    textbox2.addEventListener('click',function(){
                        move_textbox2 = "false";//ok
                        textbox2.classList.remove('textbox_move');
                    });
                }
            });
        }else{
            judge_textbox2="false";//ok
        }
    }
});

//テキストボックス3*********************************************

var judge_textbox3 = "false"; //マウス座標が要素内にあれば"true"
var move_textbox3 = "false"; //judge_textbox3がtrueのときに要素をクリックしたら"true"
document.addEventListener('mousemove', function(event){
// マウスの座標を取得
const x = event.clientX;
const y = event.clientY;
if(document.getElementById('textbox3')){//id=textbox3が存在するとき
    const textbox3 = document.getElementById('textbox3');
    const rect = textbox3.getBoundingClientRect(); // 要素の座標を取得
    //要素の座標を格納
    const textbox_x_left = rect.left;//左
    const textbox_x_right = rect.right-25;//右 ※ズームボタン考慮
    const textbox_y_top = rect.top;//上
    const textbox_y_bottom = rect.bottom;//下 ※ボトム
    const textbox_width = (rect.right - rect.left)/2; //要素の横幅の半分
    const textbox_height = (rect.bottom - rect.top)/2; //要素の縦幅の半分　※これで中心に来る
    if(x >= textbox_x_left && x <= textbox_x_right && y <= textbox_y_bottom && y >= textbox_y_top){//マウス座標が要素内にあれば
        judge_textbox3="true";
        textbox3.addEventListener('click',function(){
            move_textbox3 = "true";//ok
            textbox3.classList.add('textbox_move');
        });
        document.addEventListener('mousemove',function(){
            if(move_textbox3 == "true"){
                textbox3.style.left = x-textbox_width+`px`;
                textbox3.style.top = y-textbox_height+`px`;
                textbox3.addEventListener('click',function(){
                    move_textbox3 = "false";//ok
                    textbox3.classList.remove('textbox_move');
                });
            }
        });
    }else{
        judge_textbox3="false";//ok
    }
}
});

//テキストボックス4*********************************************

var judge_textbox4 = "false"; //マウス座標が要素内にあれば"true"
var move_textbox4 = "false"; //judge_textbox4がtrueのときに要素をクリックしたら"true"
document.addEventListener('mousemove', function(event){
// マウスの座標を取得
const x = event.clientX;
const y = event.clientY;
if(document.getElementById('textbox4')){//id=textbox4が存在するとき
    const textbox4 = document.getElementById('textbox4');
    const rect = textbox4.getBoundingClientRect(); // 要素の座標を取得
    //要素の座標を格納
    const textbox_x_left = rect.left;//左
    const textbox_x_right = rect.right-25;//右 ※ズームボタン考慮
    const textbox_y_top = rect.top;//上
    const textbox_y_bottom = rect.bottom;//下 ※ボトム
    const textbox_width = (rect.right - rect.left)/2; //要素の横幅の半分
    const textbox_height = (rect.bottom - rect.top)/2; //要素の縦幅の半分　※これで中心に来る
    if(x >= textbox_x_left && x <= textbox_x_right && y <= textbox_y_bottom && y >= textbox_y_top){//マウス座標が要素内にあれば
        judge_textbox4="true";
        textbox4.addEventListener('click',function(){
            move_textbox4 = "true";//ok
            textbox4.classList.add('textbox_move');
        });
        document.addEventListener('mousemove',function(){
            if(move_textbox4 == "true"){
                textbox4.style.left = x-textbox_width+`px`;
                textbox4.style.top = y-textbox_height+`px`;
                textbox4.addEventListener('click',function(){
                    move_textbox4 = "false";//ok
                    textbox4.classList.remove('textbox_move');
                });
            }
        });
    }else{
        judge_textbox4="false";//ok
    }
}
});

//テキストボックス5*********************************************

var judge_textbox5 = "false"; //マウス座標が要素内にあれば"true"
var move_textbox5 = "false"; //judge_textbox5がtrueのときに要素をクリックしたら"true"
document.addEventListener('mousemove', function(event){
// マウスの座標を取得
const x = event.clientX;
const y = event.clientY;
if(document.getElementById('textbox5')){//id=textbox5が存在するとき
    const textbox5 = document.getElementById('textbox5');
    const rect = textbox5.getBoundingClientRect(); // 要素の座標を取得
    //要素の座標を格納
    const textbox_x_left = rect.left;//左
    const textbox_x_right = rect.right-25;//右 ※ズームボタン考慮
    const textbox_y_top = rect.top;//上
    const textbox_y_bottom = rect.bottom;//下 ※ボトム
    const textbox_width = (rect.right - rect.left)/2; //要素の横幅の半分
    const textbox_height = (rect.bottom - rect.top)/2; //要素の縦幅の半分　※これで中心に来る
    if(x >= textbox_x_left && x <= textbox_x_right && y <= textbox_y_bottom && y >= textbox_y_top){//マウス座標が要素内にあれば
        judge_textbox5="true";
        textbox5.addEventListener('click',function(){
            move_textbox5 = "true";//ok
            textbox5.classList.add('textbox_move');
        });
        document.addEventListener('mousemove',function(){
            if(move_textbox5 == "true"){
                textbox5.style.left = x-textbox_width+`px`;
                textbox5.style.top = y-textbox_height+`px`;
                textbox5.addEventListener('click',function(){
                    move_textbox5 = "false";//ok
                    textbox5.classList.remove('textbox_move');
                });
            }
        });
    }else{
        judge_textbox5="false";//ok
    }
}
});

//テキストボックス6*********************************************

var judge_textbox6 = "false"; //マウス座標が要素内にあれば"true"
var move_textbox6 = "false"; //judge_textbox6がtrueのときに要素をクリックしたら"true"
document.addEventListener('mousemove', function(event){
// マウスの座標を取得
const x = event.clientX;
const y = event.clientY;
if(document.getElementById('textbox6')){//id=textbox6が存在するとき
    const textbox6 = document.getElementById('textbox6');
    const rect = textbox6.getBoundingClientRect(); // 要素の座標を取得
    //要素の座標を格納
    const textbox_x_left = rect.left;//左
    const textbox_x_right = rect.right-25;//右 ※ズームボタン考慮
    const textbox_y_top = rect.top;//上
    const textbox_y_bottom = rect.bottom;//下 ※ボトム
    const textbox_width = (rect.right - rect.left)/2; //要素の横幅の半分
    const textbox_height = (rect.bottom - rect.top)/2; //要素の縦幅の半分　※これで中心に来る
    if(x >= textbox_x_left && x <= textbox_x_right && y <= textbox_y_bottom && y >= textbox_y_top){//マウス座標が要素内にあれば
        judge_textbox6="true";
        textbox6.addEventListener('click',function(){
            move_textbox6 = "true";//ok
            textbox6.classList.add('textbox_move');
        });
        document.addEventListener('mousemove',function(){
            if(move_textbox6 == "true"){
                textbox6.style.left = x-textbox_width+`px`;
                textbox6.style.top = y-textbox_height+`px`;
                textbox6.addEventListener('click',function(){
                    move_textbox6 = "false";//ok
                    textbox6.classList.remove('textbox_move');
                });
            }
        });
    }else{
        judge_textbox6="false";//ok
    }
}
});

//テキストボックス7*********************************************

var judge_textbox7 = "false"; //マウス座標が要素内にあれば"true"
var move_textbox7 = "false"; //judge_textbox7がtrueのときに要素をクリックしたら"true"
document.addEventListener('mousemove', function(event){
// マウスの座標を取得
const x = event.clientX;
const y = event.clientY;
if(document.getElementById('textbox7')){//id=textbox7が存在するとき
    const textbox7 = document.getElementById('textbox7');
    const rect = textbox7.getBoundingClientRect(); // 要素の座標を取得
    //要素の座標を格納
    const textbox_x_left = rect.left;//左
    const textbox_x_right = rect.right-25;//右 ※ズームボタン考慮
    const textbox_y_top = rect.top;//上
    const textbox_y_bottom = rect.bottom;//下 ※ボトム
    const textbox_width = (rect.right - rect.left)/2; //要素の横幅の半分
    const textbox_height = (rect.bottom - rect.top)/2; //要素の縦幅の半分　※これで中心に来る
    if(x >= textbox_x_left && x <= textbox_x_right && y <= textbox_y_bottom && y >= textbox_y_top){//マウス座標が要素内にあれば
        judge_textbox7="true";
        textbox7.addEventListener('click',function(){
            move_textbox7 = "true";//ok
            textbox7.classList.add('textbox_move');
        });
        document.addEventListener('mousemove',function(){
            if(move_textbox7 == "true"){
                textbox7.style.left = x-textbox_width+`px`;
                textbox7.style.top = y-textbox_height+`px`;
                textbox7.addEventListener('click',function(){
                    move_textbox7 = "false";//ok
                    textbox7.classList.remove('textbox_move');
                });
            }
        });
    }else{
        judge_textbox7="false";//ok
    }
}
});

//テキストボックス8*********************************************

var judge_textbox8 = "false"; //マウス座標が要素内にあれば"true"
var move_textbox8 = "false"; //judge_textbox8がtrueのときに要素をクリックしたら"true"
document.addEventListener('mousemove', function(event){
// マウスの座標を取得
const x = event.clientX;
const y = event.clientY;
if(document.getElementById('textbox8')){//id=textbox8が存在するとき
    const textbox8 = document.getElementById('textbox8');
    const rect = textbox8.getBoundingClientRect(); // 要素の座標を取得
    //要素の座標を格納
    const textbox_x_left = rect.left;//左
    const textbox_x_right = rect.right-25;//右 ※ズームボタン考慮
    const textbox_y_top = rect.top;//上
    const textbox_y_bottom = rect.bottom;//下 ※ボトム
    const textbox_width = (rect.right - rect.left)/2; //要素の横幅の半分
    const textbox_height = (rect.bottom - rect.top)/2; //要素の縦幅の半分　※これで中心に来る
    if(x >= textbox_x_left && x <= textbox_x_right && y <= textbox_y_bottom && y >= textbox_y_top){//マウス座標が要素内にあれば
        judge_textbox8="true";
        textbox8.addEventListener('click',function(){
            move_textbox8 = "true";//ok
            textbox8.classList.add('textbox_move');
        });
        document.addEventListener('mousemove',function(){
            if(move_textbox8 == "true"){
                textbox8.style.left = x-textbox_width+`px`;
                textbox8.style.top = y-textbox_height+`px`;
                textbox8.addEventListener('click',function(){
                    move_textbox8 = "false";//ok
                    textbox8.classList.remove('textbox_move');
                });
            }
        });
    }else{
        judge_textbox8="false";//ok
    }
}
});

//テキストボックス9*********************************************

var judge_textbox9 = "false"; //マウス座標が要素内にあれば"true"
var move_textbox9 = "false"; //judge_textbox9がtrueのときに要素をクリックしたら"true"
document.addEventListener('mousemove', function(event){
// マウスの座標を取得
const x = event.clientX;
const y = event.clientY;
if(document.getElementById('textbox9')){//id=textbox9が存在するとき
    const textbox9 = document.getElementById('textbox9');
    const rect = textbox9.getBoundingClientRect(); // 要素の座標を取得
    //要素の座標を格納
    const textbox_x_left = rect.left;//左
    const textbox_x_right = rect.right-25;//右 ※ズームボタン考慮
    const textbox_y_top = rect.top;//上
    const textbox_y_bottom = rect.bottom;//下 ※ボトム
    const textbox_width = (rect.right - rect.left)/2; //要素の横幅の半分
    const textbox_height = (rect.bottom - rect.top)/2; //要素の縦幅の半分　※これで中心に来る
    if(x >= textbox_x_left && x <= textbox_x_right && y <= textbox_y_bottom && y >= textbox_y_top){//マウス座標が要素内にあれば
        judge_textbox9="true";
        textbox9.addEventListener('click',function(){
            move_textbox9 = "true";//ok
            textbox9.classList.add('textbox_move');
        });
        document.addEventListener('mousemove',function(){
            if(move_textbox9 == "true"){
                textbox9.style.left = x-textbox_width+`px`;
                textbox9.style.top = y-textbox_height+`px`;
                textbox9.addEventListener('click',function(){
                    move_textbox9 = "false";//ok
                    textbox9.classList.remove('textbox_move');
                });
            }
        });
    }else{
        judge_textbox9="false";//ok
    }
}
});

//テキストボックス10*********************************************

var judge_textbox10 = "false"; //マウス座標が要素内にあれば"true"
var move_textbox10 = "false"; //judge_textbox10がtrueのときに要素をクリックしたら"true"
document.addEventListener('mousemove', function(event){
// マウスの座標を取得
const x = event.clientX;
const y = event.clientY;
if(document.getElementById('textbox10')){//id=textbox10が存在するとき
    const textbox10 = document.getElementById('textbox10');
    const rect = textbox10.getBoundingClientRect(); // 要素の座標を取得
    //要素の座標を格納
    const textbox_x_left = rect.left;//左
    const textbox_x_right = rect.right-25;//右 ※ズームボタン考慮
    const textbox_y_top = rect.top;//上
    const textbox_y_bottom = rect.bottom;//下 ※ボトム
    const textbox_width = (rect.right - rect.left)/2; //要素の横幅の半分
    const textbox_height = (rect.bottom - rect.top)/2; //要素の縦幅の半分　※これで中心に来る
    if(x >= textbox_x_left && x <= textbox_x_right && y <= textbox_y_bottom && y >= textbox_y_top){//マウス座標が要素内にあれば
        judge_textbox10="true";
        textbox10.addEventListener('click',function(){
            move_textbox10 = "true";//ok
            textbox10.classList.add('textbox_move');
        });
        document.addEventListener('mousemove',function(){
            if(move_textbox10 == "true"){
                textbox10.style.left = x-textbox_width+`px`;
                textbox10.style.top = y-textbox_height+`px`;
                textbox10.addEventListener('click',function(){
                    move_textbox10 = "false";//ok
                    textbox10.classList.remove('textbox_move');
                });
            }
        });
    }else{
        judge_textbox10="false";//ok
    }
}
});

//*******フォントサイズ動的変更****************************************************************************************************************************

//テキストボックス1用
var textbox1_height_log = 0;//履歴用
var textbox1_font = 22; //初期値固定フォントサイズ（可変）
setInterval(() => {
if(document.getElementById('textbox1')){
    // alert("ok");//ok
    const textbox = document.getElementById('textbox1');
    const rect = textbox.getBoundingClientRect(); // 要素の座標を取得
    //要素の座標を格納
    const textbox_height = rect.bottom - rect.top;
    var last_heigth = textbox_height;//最後に検出したheightを格納
    textbox1_height_log++;//キー用のカウント
    textbox.style.fontSize = last_heigth-10 + "px";//heightの単位もpxなのでそのまま代入でいい（余白分10px）
}
}, 10);

//テキストボックス2用
var textbox2_height_log = 0;//履歴用
var textbox2_font = 22; //初期値固定フォントサイズ（可変）
setInterval(() => {
if(document.getElementById('textbox2')){
    // alert("ok");//ok
    const textbox = document.getElementById('textbox2');
    const rect = textbox.getBoundingClientRect(); // 要素の座標を取得
    //要素の座標を格納
    const textbox_height = rect.bottom - rect.top;
    var last_heigth = textbox_height;//最後に検出したheightを格納
    textbox2_height_log++;//キー用のカウント
    textbox.style.fontSize = last_heigth-10 + "px";//heightの単位もpxなのでそのまま代入でいい（余白分10px）
}
}, 10);

//テキストボックス3用
var textbox3_height_log = 0;//履歴用
var textbox3_font = 22; //初期値固定フォントサイズ（可変）
setInterval(() => {
if(document.getElementById('textbox3')){
    // alert("ok");//ok
    const textbox = document.getElementById('textbox3');
    const rect = textbox.getBoundingClientRect(); // 要素の座標を取得
    //要素の座標を格納
    const textbox_height = rect.bottom - rect.top;
    var last_heigth = textbox_height;//最後に検出したheightを格納
    textbox3_height_log++;//キー用のカウント
    textbox.style.fontSize = last_heigth-10 + "px";//heightの単位もpxなのでそのまま代入でいい（余白分10px）
}
}, 10);

//テキストボックス4用
var textbox4_height_log = 0;//履歴用
var textbox4_font = 22; //初期値固定フォントサイズ（可変）
setInterval(() => {
if(document.getElementById('textbox4')){
    // alert("ok");//ok
    const textbox = document.getElementById('textbox4');
    const rect = textbox.getBoundingClientRect(); // 要素の座標を取得
    //要素の座標を格納
    const textbox_height = rect.bottom - rect.top;
    var last_heigth = textbox_height;//最後に検出したheightを格納
    textbox4_height_log++;//キー用のカウント
    textbox.style.fontSize = last_heigth-10 + "px";//heightの単位もpxなのでそのまま代入でいい（余白分10px）
}
}, 10);

//テキストボックス5用
var textbox5_height_log = 0;//履歴用
var textbox5_font = 22; //初期値固定フォントサイズ（可変）
setInterval(() => {
if(document.getElementById('textbox5')){
    // alert("ok");//ok
    const textbox = document.getElementById('textbox5');
    const rect = textbox.getBoundingClientRect(); // 要素の座標を取得
    //要素の座標を格納
    const textbox_height = rect.bottom - rect.top;
    var last_heigth = textbox_height;//最後に検出したheightを格納
    textbox5_height_log++;//キー用のカウント
    textbox.style.fontSize = last_heigth-10 + "px";//heightの単位もpxなのでそのまま代入でいい（余白分10px）
}
}, 10);

//テキストボックス6用
var textbox6_height_log = 0;//履歴用
var textbox6_font = 22; //初期値固定フォントサイズ（可変）
setInterval(() => {
if(document.getElementById('textbox6')){
    // alert("ok");//ok
    const textbox = document.getElementById('textbox6');
    const rect = textbox.getBoundingClientRect(); // 要素の座標を取得
    //要素の座標を格納
    const textbox_height = rect.bottom - rect.top;
    var last_heigth = textbox_height;//最後に検出したheightを格納
    textbox6_height_log++;//キー用のカウント
    textbox.style.fontSize = last_heigth-10 + "px";//heightの単位もpxなのでそのまま代入でいい（余白分10px）
}
}, 10);

//テキストボックス7用
var textbox7_height_log = 0;//履歴用
var textbox7_font = 22; //初期値固定フォントサイズ（可変）
setInterval(() => {
if(document.getElementById('textbox7')){
    // alert("ok");//ok
    const textbox = document.getElementById('textbox7');
    const rect = textbox.getBoundingClientRect(); // 要素の座標を取得
    //要素の座標を格納
    const textbox_height = rect.bottom - rect.top;
    var last_heigth = textbox_height;//最後に検出したheightを格納
    textbox7_height_log++;//キー用のカウント
    textbox.style.fontSize = last_heigth-10 + "px";//heightの単位もpxなのでそのまま代入でいい（余白分10px）
}
}, 10);

//テキストボックス8用
var textbox8_height_log = 0;//履歴用
var textbox8_font = 22; //初期値固定フォントサイズ（可変）
setInterval(() => {
if(document.getElementById('textbox8')){
    // alert("ok");//ok
    const textbox = document.getElementById('textbox8');
    const rect = textbox.getBoundingClientRect(); // 要素の座標を取得
    //要素の座標を格納
    const textbox_height = rect.bottom - rect.top;
    var last_heigth = textbox_height;//最後に検出したheightを格納
    textbox8_height_log++;//キー用のカウント
    textbox.style.fontSize = last_heigth-10 + "px";//heightの単位もpxなのでそのまま代入でいい（余白分10px）
}
}, 10);

//テキストボックス9用
var textbox9_height_log = 0;//履歴用
var textbox9_font = 22; //初期値固定フォントサイズ（可変）
setInterval(() => {
if(document.getElementById('textbox9')){
    // alert("ok");//ok
    const textbox = document.getElementById('textbox9');
    const rect = textbox.getBoundingClientRect(); // 要素の座標を取得
    //要素の座標を格納
    const textbox_height = rect.bottom - rect.top;
    var last_heigth = textbox_height;//最後に検出したheightを格納
    textbox9_height_log++;//キー用のカウント
    textbox.style.fontSize = last_heigth-10 + "px";//heightの単位もpxなのでそのまま代入でいい（余白分10px）
}
}, 10);

//テキストボックス10用
var textbox10_height_log = 0;//履歴用
var textbox10_font = 22; //初期値固定フォントサイズ（可変）
setInterval(() => {
if(document.getElementById('textbox10')){
    // alert("ok");//ok
    const textbox = document.getElementById('textbox10');
    const rect = textbox.getBoundingClientRect(); // 要素の座標を取得
    //要素の座標を格納
    const textbox_height = rect.bottom - rect.top;
    var last_heigth = textbox_height;//最後に検出したheightを格納
    textbox10_height_log++;//キー用のカウント
    textbox.style.fontSize = last_heigth-10 + "px";//heightの単位もpxなのでそのまま代入でいい（余白分10px）
}
}, 10);

//動的移動系******************************************（ラジオ）**********************************************************************************

//1-1*********************************************

var judge_radio11 = "false"; //マウス座標が要素内にあれば"true"
var move_radio11 = "false"; //judge_radio1がtrueのときに要素をクリックしたら"true"
document.addEventListener('mousemove', function(event){
    // マウスの座標を取得
    const x = event.clientX;
    const y = event.clientY;
    if(document.getElementById('radio1_1')){//id=radio1が存在するとき
        const radio1_1 = document.getElementById('radio1_1');
        const rect = radio1_1.getBoundingClientRect(); // 要素の座標を取得
        //要素の座標を格納
        const radio_x_left = rect.left;//左
        const radio_x_right = rect.right-25;//右 ※ズームボタン考慮
        const radio_y_top = rect.top;//上
        const radio_y_bottom = rect.bottom;//下 ※ボトム
        const radio_width = (rect.right - rect.left)/2; //要素の横幅の半分
        const radio_height = (rect.bottom - rect.top)/2; //要素の縦幅の半分　※これで中心に来る
        if(x >= radio_x_left && x <= radio_x_right && y <= radio_y_bottom && y >= radio_y_top){//マウス座標が要素内にあれば
            judge_radio11="true";
            radio1_1.addEventListener('click',function(){
                move_radio11 = "true";//ok
                radio1_1.classList.add('radio_move');
            });
            document.addEventListener('mousemove',function(){
                if(move_radio11 == "true"){
                    radio1_1.style.left = x-radio_width+`px`;
                    radio1_1.style.top = y-radio_height+`px`;
                    radio1_1.addEventListener('click',function(){
                        move_radio11 = "false";//ok
                        radio1_1.classList.remove('radio_move');
                    });
                }
            });
        }else{
            judge_radio11="false";//ok
        }
    }
});

//1-2*********************************************

var judge_radio12 = "false"; //マウス座標が要素内にあれば"true"
var move_radio12 = "false"; //judge_radio1がtrueのときに要素をクリックしたら"true"
document.addEventListener('mousemove', function(event){
    // マウスの座標を取得
    const x = event.clientX;
    const y = event.clientY;
    if(document.getElementById('radio1_2')){//id=radio1が存在するとき
        const radio1_2 = document.getElementById('radio1_2');
        const rect = radio1_2.getBoundingClientRect(); // 要素の座標を取得
        //要素の座標を格納
        const radio_x_left = rect.left;//左
        const radio_x_right = rect.right-25;//右 ※ズームボタン考慮
        const radio_y_top = rect.top;//上
        const radio_y_bottom = rect.bottom;//下 ※ボトム
        const radio_width = (rect.right - rect.left)/2; //要素の横幅の半分
        const radio_height = (rect.bottom - rect.top)/2; //要素の縦幅の半分　※これで中心に来る
        if(x >= radio_x_left && x <= radio_x_right && y <= radio_y_bottom && y >= radio_y_top){//マウス座標が要素内にあれば
            judge_radio12="true";
            radio1_2.addEventListener('click',function(){
                move_radio12 = "true";//ok
                radio1_2.classList.add('radio_move');
            });
            document.addEventListener('mousemove',function(){
                if(move_radio12 == "true"){
                    radio1_2.style.left = x-radio_width+`px`;
                    radio1_2.style.top = y-radio_height+`px`;
                    radio1_2.addEventListener('click',function(){
                        move_radio12 = "false";//ok
                        radio1_2.classList.remove('radio_move');
                    });
                }
            });
        }else{
            judge_radio12="false";//ok
        }
    }
});

//1-3*********************************************

var judge_radio13 = "false"; //マウス座標が要素内にあれば"true"
var move_radio13 = "false"; //judge_radio1がtrueのときに要素をクリックしたら"true"
document.addEventListener('mousemove', function(event){
    // マウスの座標を取得
    const x = event.clientX;
    const y = event.clientY;
    if(document.getElementById('radio1_3')){//id=radio1が存在するとき
        const radio1_3 = document.getElementById('radio1_3');
        const rect = radio1_3.getBoundingClientRect(); // 要素の座標を取得
        //要素の座標を格納
        const radio_x_left = rect.left;//左
        const radio_x_right = rect.right-25;//右 ※ズームボタン考慮
        const radio_y_top = rect.top;//上
        const radio_y_bottom = rect.bottom;//下 ※ボトム
        const radio_width = (rect.right - rect.left)/2; //要素の横幅の半分
        const radio_height = (rect.bottom - rect.top)/2; //要素の縦幅の半分　※これで中心に来る
        if(x >= radio_x_left && x <= radio_x_right && y <= radio_y_bottom && y >= radio_y_top){//マウス座標が要素内にあれば
            judge_radio13="true";
            radio1_3.addEventListener('click',function(){
                move_radio13 = "true";//ok
                radio1_3.classList.add('radio_move');
            });
            document.addEventListener('mousemove',function(){
                if(move_radio13 == "true"){
                    radio1_3.style.left = x-radio_width+`px`;
                    radio1_3.style.top = y-radio_height+`px`;
                    radio1_3.addEventListener('click',function(){
                        move_radio13 = "false";//ok
                        radio1_3.classList.remove('radio_move');
                    });
                }
            });
        }else{
            judge_radio13="false";//ok
        }
    }
});

//1-4*********************************************

var judge_radio14 = "false"; //マウス座標が要素内にあれば"true"
var move_radio14 = "false"; //judge_radio1がtrueのときに要素をクリックしたら"true"
document.addEventListener('mousemove', function(event){
    // マウスの座標を取得
    const x = event.clientX;
    const y = event.clientY;
    if(document.getElementById('radio1_4')){//id=radio1が存在するとき
        const radio1_4 = document.getElementById('radio1_4');
        const rect = radio1_4.getBoundingClientRect(); // 要素の座標を取得
        //要素の座標を格納
        const radio_x_left = rect.left;//左
        const radio_x_right = rect.right-25;//右 ※ズームボタン考慮
        const radio_y_top = rect.top;//上
        const radio_y_bottom = rect.bottom;//下 ※ボトム
        const radio_width = (rect.right - rect.left)/2; //要素の横幅の半分
        const radio_height = (rect.bottom - rect.top)/2; //要素の縦幅の半分　※これで中心に来る
        if(x >= radio_x_left && x <= radio_x_right && y <= radio_y_bottom && y >= radio_y_top){//マウス座標が要素内にあれば
            judge_radio14="true";
            radio1_4.addEventListener('click',function(){
                move_radio14 = "true";//ok
                radio1_4.classList.add('radio_move');
            });
            document.addEventListener('mousemove',function(){
                if(move_radio14 == "true"){
                    radio1_4.style.left = x-radio_width+`px`;
                    radio1_4.style.top = y-radio_height+`px`;
                    radio1_4.addEventListener('click',function(){
                        move_radio14 = "false";//ok
                        radio1_4.classList.remove('radio_move');
                    });
                }
            });
        }else{
            judge_radio14="false";//ok
        }
    }
});

//1-5*********************************************

var judge_radio15 = "false"; //マウス座標が要素内にあれば"true"
var move_radio15 = "false"; //judge_radio1がtrueのときに要素をクリックしたら"true"
document.addEventListener('mousemove', function(event){
    // マウスの座標を取得
    const x = event.clientX;
    const y = event.clientY;
    if(document.getElementById('radio1_5')){//id=radio1が存在するとき
        const radio1_5 = document.getElementById('radio1_5');
        const rect = radio1_5.getBoundingClientRect(); // 要素の座標を取得
        //要素の座標を格納
        const radio_x_left = rect.left;//左
        const radio_x_right = rect.right-25;//右 ※ズームボタン考慮
        const radio_y_top = rect.top;//上
        const radio_y_bottom = rect.bottom;//下 ※ボトム
        const radio_width = (rect.right - rect.left)/2; //要素の横幅の半分
        const radio_height = (rect.bottom - rect.top)/2; //要素の縦幅の半分　※これで中心に来る
        if(x >= radio_x_left && x <= radio_x_right && y <= radio_y_bottom && y >= radio_y_top){//マウス座標が要素内にあれば
            judge_radio15="true";
            radio1_5.addEventListener('click',function(){
                move_radio15 = "true";//ok
                radio1_5.classList.add('radio_move');
            });
            document.addEventListener('mousemove',function(){
                if(move_radio15 == "true"){
                    radio1_5.style.left = x-radio_width+`px`;
                    radio1_5.style.top = y-radio_height+`px`;
                    radio1_5.addEventListener('click',function(){
                        move_radio15 = "false";//ok
                        radio1_5.classList.remove('radio_move');
                    });
                }
            });
        }else{
            judge_radio15="false";//ok
        }
    }
});

//1-6*********************************************

var judge_radio16 = "false"; //マウス座標が要素内にあれば"true"
var move_radio16 = "false"; //judge_radio1がtrueのときに要素をクリックしたら"true"
document.addEventListener('mousemove', function(event){
    // マウスの座標を取得
    const x = event.clientX;
    const y = event.clientY;
    if(document.getElementById('radio1_6')){//id=radio1が存在するとき
        const radio1_6 = document.getElementById('radio1_6');
        const rect = radio1_6.getBoundingClientRect(); // 要素の座標を取得
        //要素の座標を格納
        const radio_x_left = rect.left;//左
        const radio_x_right = rect.right-25;//右 ※ズームボタン考慮
        const radio_y_top = rect.top;//上
        const radio_y_bottom = rect.bottom;//下 ※ボトム
        const radio_width = (rect.right - rect.left)/2; //要素の横幅の半分
        const radio_height = (rect.bottom - rect.top)/2; //要素の縦幅の半分　※これで中心に来る
        if(x >= radio_x_left && x <= radio_x_right && y <= radio_y_bottom && y >= radio_y_top){//マウス座標が要素内にあれば
            judge_radio16="true";
            radio1_6.addEventListener('click',function(){
                move_radio16 = "true";//ok
                radio1_6.classList.add('radio_move');
            });
            document.addEventListener('mousemove',function(){
                if(move_radio16 == "true"){
                    radio1_6.style.left = x-radio_width+`px`;
                    radio1_6.style.top = y-radio_height+`px`;
                    radio1_6.addEventListener('click',function(){
                        move_radio16 = "false";//ok
                        radio1_6.classList.remove('radio_move');
                    });
                }
            });
        }else{
            judge_radio16="false";//ok
        }
    }
});

//1-7*********************************************

var judge_radio17 = "false"; //マウス座標が要素内にあれば"true"
var move_radio17 = "false"; //judge_radio1がtrueのときに要素をクリックしたら"true"
document.addEventListener('mousemove', function(event){
    // マウスの座標を取得
    const x = event.clientX;
    const y = event.clientY;
    if(document.getElementById('radio1_7')){//id=radio1が存在するとき
        const radio1_7 = document.getElementById('radio1_7');
        const rect = radio1_7.getBoundingClientRect(); // 要素の座標を取得
        //要素の座標を格納
        const radio_x_left = rect.left;//左
        const radio_x_right = rect.right-25;//右 ※ズームボタン考慮
        const radio_y_top = rect.top;//上
        const radio_y_bottom = rect.bottom;//下 ※ボトム
        const radio_width = (rect.right - rect.left)/2; //要素の横幅の半分
        const radio_height = (rect.bottom - rect.top)/2; //要素の縦幅の半分　※これで中心に来る
        if(x >= radio_x_left && x <= radio_x_right && y <= radio_y_bottom && y >= radio_y_top){//マウス座標が要素内にあれば
            judge_radio17="true";
            radio1_7.addEventListener('click',function(){
                move_radio17 = "true";//ok
                radio1_7.classList.add('radio_move');
            });
            document.addEventListener('mousemove',function(){
                if(move_radio17 == "true"){
                    radio1_7.style.left = x-radio_width+`px`;
                    radio1_7.style.top = y-radio_height+`px`;
                    radio1_7.addEventListener('click',function(){
                        move_radio17 = "false";//ok
                        radio1_7.classList.remove('radio_move');
                    });
                }
            });
        }else{
            judge_radio17="false";//ok
        }
    }
});

//1-8*********************************************

var judge_radio18 = "false"; //マウス座標が要素内にあれば"true"
var move_radio18 = "false"; //judge_radio1がtrueのときに要素をクリックしたら"true"
document.addEventListener('mousemove', function(event){
    // マウスの座標を取得
    const x = event.clientX;
    const y = event.clientY;
    if(document.getElementById('radio1_8')){//id=radio1が存在するとき
        const radio1_8 = document.getElementById('radio1_8');
        const rect = radio1_8.getBoundingClientRect(); // 要素の座標を取得
        //要素の座標を格納
        const radio_x_left = rect.left;//左
        const radio_x_right = rect.right-25;//右 ※ズームボタン考慮
        const radio_y_top = rect.top;//上
        const radio_y_bottom = rect.bottom;//下 ※ボトム
        const radio_width = (rect.right - rect.left)/2; //要素の横幅の半分
        const radio_height = (rect.bottom - rect.top)/2; //要素の縦幅の半分　※これで中心に来る
        if(x >= radio_x_left && x <= radio_x_right && y <= radio_y_bottom && y >= radio_y_top){//マウス座標が要素内にあれば
            judge_radio18="true";
            radio1_8.addEventListener('click',function(){
                move_radio18 = "true";//ok
                radio1_8.classList.add('radio_move');
            });
            document.addEventListener('mousemove',function(){
                if(move_radio18 == "true"){
                    radio1_8.style.left = x-radio_width+`px`;
                    radio1_8.style.top = y-radio_height+`px`;
                    radio1_8.addEventListener('click',function(){
                        move_radio18 = "false";//ok
                        radio1_8.classList.remove('radio_move');
                    });
                }
            });
        }else{
            judge_radio18="false";//ok
        }
    }
});

//2-1*********************************************

var judge_radio21 = "false"; //マウス座標が要素内にあれば"true"
var move_radio21 = "false"; //judge_radio1がtrueのときに要素をクリックしたら"true"
document.addEventListener('mousemove', function(event){
    // マウスの座標を取得
    const x = event.clientX;
    const y = event.clientY;
    if(document.getElementById('radio2_1')){//id=radio1が存在するとき
        const radio2_1 = document.getElementById('radio2_1');
        const rect = radio2_1.getBoundingClientRect(); // 要素の座標を取得
        //要素の座標を格納
        const radio_x_left = rect.left;//左
        const radio_x_right = rect.right-25;//右 ※ズームボタン考慮
        const radio_y_top = rect.top;//上
        const radio_y_bottom = rect.bottom;//下 ※ボトム
        const radio_width = (rect.right - rect.left)/2; //要素の横幅の半分
        const radio_height = (rect.bottom - rect.top)/2; //要素の縦幅の半分　※これで中心に来る
        if(x >= radio_x_left && x <= radio_x_right && y <= radio_y_bottom && y >= radio_y_top){//マウス座標が要素内にあれば
            judge_radio21="true";
            radio2_1.addEventListener('click',function(){
                move_radio21 = "true";//ok
                radio2_1.classList.add('radio_move');
            });
            document.addEventListener('mousemove',function(){
                if(move_radio21 == "true"){
                    radio2_1.style.left = x-radio_width+`px`;
                    radio2_1.style.top = y-radio_height+`px`;
                    radio2_1.addEventListener('click',function(){
                        move_radio21 = "false";//ok
                        radio2_1.classList.remove('radio_move');
                    });
                }
            });
        }else{
            judge_radio21="false";//ok
        }
    }
});

//2-2*********************************************

var judge_radio22 = "false"; //マウス座標が要素内にあれば"true"
var move_radio22 = "false"; //judge_radio1がtrueのときに要素をクリックしたら"true"
document.addEventListener('mousemove', function(event){
    // マウスの座標を取得
    const x = event.clientX;
    const y = event.clientY;
    if(document.getElementById('radio2_2')){//id=radio1が存在するとき
        const radio2_2 = document.getElementById('radio2_2');
        const rect = radio2_2.getBoundingClientRect(); // 要素の座標を取得
        //要素の座標を格納
        const radio_x_left = rect.left;//左
        const radio_x_right = rect.right-25;//右 ※ズームボタン考慮
        const radio_y_top = rect.top;//上
        const radio_y_bottom = rect.bottom;//下 ※ボトム
        const radio_width = (rect.right - rect.left)/2; //要素の横幅の半分
        const radio_height = (rect.bottom - rect.top)/2; //要素の縦幅の半分　※これで中心に来る
        if(x >= radio_x_left && x <= radio_x_right && y <= radio_y_bottom && y >= radio_y_top){//マウス座標が要素内にあれば
            judge_radio22="true";
            radio2_2.addEventListener('click',function(){
                move_radio22 = "true";//ok
                radio2_2.classList.add('radio_move');
            });
            document.addEventListener('mousemove',function(){
                if(move_radio22 == "true"){
                    radio2_2.style.left = x-radio_width+`px`;
                    radio2_2.style.top = y-radio_height+`px`;
                    radio2_2.addEventListener('click',function(){
                        move_radio22 = "false";//ok
                        radio2_2.classList.remove('radio_move');
                    });
                }
            });
        }else{
            judge_radio22="false";//ok
        }
    }
});

//2-3*********************************************

var judge_radio23 = "false"; //マウス座標が要素内にあれば"true"
var move_radio23 = "false"; //judge_radio1がtrueのときに要素をクリックしたら"true"
document.addEventListener('mousemove', function(event){
    // マウスの座標を取得
    const x = event.clientX;
    const y = event.clientY;
    if(document.getElementById('radio2_3')){//id=radio1が存在するとき
        const radio2_3 = document.getElementById('radio2_3');
        const rect = radio2_3.getBoundingClientRect(); // 要素の座標を取得
        //要素の座標を格納
        const radio_x_left = rect.left;//左
        const radio_x_right = rect.right-25;//右 ※ズームボタン考慮
        const radio_y_top = rect.top;//上
        const radio_y_bottom = rect.bottom;//下 ※ボトム
        const radio_width = (rect.right - rect.left)/2; //要素の横幅の半分
        const radio_height = (rect.bottom - rect.top)/2; //要素の縦幅の半分　※これで中心に来る
        if(x >= radio_x_left && x <= radio_x_right && y <= radio_y_bottom && y >= radio_y_top){//マウス座標が要素内にあれば
            judge_radio23="true";
            radio2_3.addEventListener('click',function(){
                move_radio23 = "true";//ok
                radio2_3.classList.add('radio_move');
            });
            document.addEventListener('mousemove',function(){
                if(move_radio23 == "true"){
                    radio2_3.style.left = x-radio_width+`px`;
                    radio2_3.style.top = y-radio_height+`px`;
                    radio2_3.addEventListener('click',function(){
                        move_radio23 = "false";//ok
                        radio2_3.classList.remove('radio_move');
                    });
                }
            });
        }else{
            judge_radio23="false";//ok
        }
    }
});

//2-4*********************************************

var judge_radio24 = "false"; //マウス座標が要素内にあれば"true"
var move_radio24 = "false"; //judge_radio1がtrueのときに要素をクリックしたら"true"
document.addEventListener('mousemove', function(event){
    // マウスの座標を取得
    const x = event.clientX;
    const y = event.clientY;
    if(document.getElementById('radio2_4')){//id=radio1が存在するとき
        const radio2_4 = document.getElementById('radio2_4');
        const rect = radio2_4.getBoundingClientRect(); // 要素の座標を取得
        //要素の座標を格納
        const radio_x_left = rect.left;//左
        const radio_x_right = rect.right-25;//右 ※ズームボタン考慮
        const radio_y_top = rect.top;//上
        const radio_y_bottom = rect.bottom;//下 ※ボトム
        const radio_width = (rect.right - rect.left)/2; //要素の横幅の半分
        const radio_height = (rect.bottom - rect.top)/2; //要素の縦幅の半分　※これで中心に来る
        if(x >= radio_x_left && x <= radio_x_right && y <= radio_y_bottom && y >= radio_y_top){//マウス座標が要素内にあれば
            judge_radio24="true";
            radio2_4.addEventListener('click',function(){
                move_radio24 = "true";//ok
                radio2_4.classList.add('radio_move');
            });
            document.addEventListener('mousemove',function(){
                if(move_radio24 == "true"){
                    radio2_4.style.left = x-radio_width+`px`;
                    radio2_4.style.top = y-radio_height+`px`;
                    radio2_4.addEventListener('click',function(){
                        move_radio24 = "false";//ok
                        radio2_4.classList.remove('radio_move');
                    });
                }
            });
        }else{
            judge_radio24="false";//ok
        }
    }
});

//2-5*********************************************

var judge_radio25 = "false"; //マウス座標が要素内にあれば"true"
var move_radio25 = "false"; //judge_radio1がtrueのときに要素をクリックしたら"true"
document.addEventListener('mousemove', function(event){
    // マウスの座標を取得
    const x = event.clientX;
    const y = event.clientY;
    if(document.getElementById('radio2_5')){//id=radio1が存在するとき
        const radio2_5 = document.getElementById('radio2_5');
        const rect = radio2_5.getBoundingClientRect(); // 要素の座標を取得
        //要素の座標を格納
        const radio_x_left = rect.left;//左
        const radio_x_right = rect.right-25;//右 ※ズームボタン考慮
        const radio_y_top = rect.top;//上
        const radio_y_bottom = rect.bottom;//下 ※ボトム
        const radio_width = (rect.right - rect.left)/2; //要素の横幅の半分
        const radio_height = (rect.bottom - rect.top)/2; //要素の縦幅の半分　※これで中心に来る
        if(x >= radio_x_left && x <= radio_x_right && y <= radio_y_bottom && y >= radio_y_top){//マウス座標が要素内にあれば
            judge_radio25="true";
            radio2_5.addEventListener('click',function(){
                move_radio25 = "true";//ok
                radio2_5.classList.add('radio_move');
            });
            document.addEventListener('mousemove',function(){
                if(move_radio25 == "true"){
                    radio2_5.style.left = x-radio_width+`px`;
                    radio2_5.style.top = y-radio_height+`px`;
                    radio2_5.addEventListener('click',function(){
                        move_radio25 = "false";//ok
                        radio2_5.classList.remove('radio_move');
                    });
                }
            });
        }else{
            judge_radio25="false";//ok
        }
    }
});

//2-6*********************************************

var judge_radio26 = "false"; //マウス座標が要素内にあれば"true"
var move_radio26 = "false"; //judge_radio1がtrueのときに要素をクリックしたら"true"
document.addEventListener('mousemove', function(event){
    // マウスの座標を取得
    const x = event.clientX;
    const y = event.clientY;
    if(document.getElementById('radio2_6')){//id=radio1が存在するとき
        const radio2_6 = document.getElementById('radio2_6');
        const rect = radio2_6.getBoundingClientRect(); // 要素の座標を取得
        //要素の座標を格納
        const radio_x_left = rect.left;//左
        const radio_x_right = rect.right-25;//右 ※ズームボタン考慮
        const radio_y_top = rect.top;//上
        const radio_y_bottom = rect.bottom;//下 ※ボトム
        const radio_width = (rect.right - rect.left)/2; //要素の横幅の半分
        const radio_height = (rect.bottom - rect.top)/2; //要素の縦幅の半分　※これで中心に来る
        if(x >= radio_x_left && x <= radio_x_right && y <= radio_y_bottom && y >= radio_y_top){//マウス座標が要素内にあれば
            judge_radio26="true";
            radio2_6.addEventListener('click',function(){
                move_radio26 = "true";//ok
                radio2_6.classList.add('radio_move');
            });
            document.addEventListener('mousemove',function(){
                if(move_radio26 == "true"){
                    radio2_6.style.left = x-radio_width+`px`;
                    radio2_6.style.top = y-radio_height+`px`;
                    radio2_6.addEventListener('click',function(){
                        move_radio26 = "false";//ok
                        radio2_6.classList.remove('radio_move');
                    });
                }
            });
        }else{
            judge_radio26="false";//ok
        }
    }
});

//2-7*********************************************

var judge_radio27 = "false"; //マウス座標が要素内にあれば"true"
var move_radio27 = "false"; //judge_radio1がtrueのときに要素をクリックしたら"true"
document.addEventListener('mousemove', function(event){
    // マウスの座標を取得
    const x = event.clientX;
    const y = event.clientY;
    if(document.getElementById('radio2_7')){//id=radio1が存在するとき
        const radio2_7 = document.getElementById('radio2_7');
        const rect = radio2_7.getBoundingClientRect(); // 要素の座標を取得
        //要素の座標を格納
        const radio_x_left = rect.left;//左
        const radio_x_right = rect.right-25;//右 ※ズームボタン考慮
        const radio_y_top = rect.top;//上
        const radio_y_bottom = rect.bottom;//下 ※ボトム
        const radio_width = (rect.right - rect.left)/2; //要素の横幅の半分
        const radio_height = (rect.bottom - rect.top)/2; //要素の縦幅の半分　※これで中心に来る
        if(x >= radio_x_left && x <= radio_x_right && y <= radio_y_bottom && y >= radio_y_top){//マウス座標が要素内にあれば
            judge_radio27="true";
            radio2_7.addEventListener('click',function(){
                move_radio27 = "true";//ok
                radio2_7.classList.add('radio_move');
            });
            document.addEventListener('mousemove',function(){
                if(move_radio27 == "true"){
                    radio2_7.style.left = x-radio_width+`px`;
                    radio2_7.style.top = y-radio_height+`px`;
                    radio2_7.addEventListener('click',function(){
                        move_radio27 = "false";//ok
                        radio2_7.classList.remove('radio_move');
                    });
                }
            });
        }else{
            judge_radio27="false";//ok
        }
    }
});

//2-8*********************************************

var judge_radio28 = "false"; //マウス座標が要素内にあれば"true"
var move_radio28 = "false"; //judge_radio1がtrueのときに要素をクリックしたら"true"
document.addEventListener('mousemove', function(event){
    // マウスの座標を取得
    const x = event.clientX;
    const y = event.clientY;
    if(document.getElementById('radio2_8')){//id=radio1が存在するとき
        const radio2_8 = document.getElementById('radio2_8');
        const rect = radio2_8.getBoundingClientRect(); // 要素の座標を取得
        //要素の座標を格納
        const radio_x_left = rect.left;//左
        const radio_x_right = rect.right-25;//右 ※ズームボタン考慮
        const radio_y_top = rect.top;//上
        const radio_y_bottom = rect.bottom;//下 ※ボトム
        const radio_width = (rect.right - rect.left)/2; //要素の横幅の半分
        const radio_height = (rect.bottom - rect.top)/2; //要素の縦幅の半分　※これで中心に来る
        if(x >= radio_x_left && x <= radio_x_right && y <= radio_y_bottom && y >= radio_y_top){//マウス座標が要素内にあれば
            judge_radio28="true";
            radio2_8.addEventListener('click',function(){
                move_radio28 = "true";//ok
                radio2_8.classList.add('radio_move');
            });
            document.addEventListener('mousemove',function(){
                if(move_radio28 == "true"){
                    radio2_8.style.left = x-radio_width+`px`;
                    radio2_8.style.top = y-radio_height+`px`;
                    radio2_8.addEventListener('click',function(){
                        move_radio28 = "false";//ok
                        radio2_8.classList.remove('radio_move');
                    });
                }
            });
        }else{
            judge_radio28="false";//ok
        }
    }
});

//3-1*********************************************

var judge_radio31 = "false"; //マウス座標が要素内にあれば"true"
var move_radio31 = "false"; //judge_radio1がtrueのときに要素をクリックしたら"true"
document.addEventListener('mousemove', function(event){
    // マウスの座標を取得
    const x = event.clientX;
    const y = event.clientY;
    if(document.getElementById('radio3_1')){//id=radio1が存在するとき
        const radio3_1 = document.getElementById('radio3_1');
        const rect = radio3_1.getBoundingClientRect(); // 要素の座標を取得
        //要素の座標を格納
        const radio_x_left = rect.left;//左
        const radio_x_right = rect.right-25;//右 ※ズームボタン考慮
        const radio_y_top = rect.top;//上
        const radio_y_bottom = rect.bottom;//下 ※ボトム
        const radio_width = (rect.right - rect.left)/2; //要素の横幅の半分
        const radio_height = (rect.bottom - rect.top)/2; //要素の縦幅の半分　※これで中心に来る
        if(x >= radio_x_left && x <= radio_x_right && y <= radio_y_bottom && y >= radio_y_top){//マウス座標が要素内にあれば
            judge_radio31="true";
            radio3_1.addEventListener('click',function(){
                move_radio31 = "true";//ok
                radio3_1.classList.add('radio_move');
            });
            document.addEventListener('mousemove',function(){
                if(move_radio31 == "true"){
                    radio3_1.style.left = x-radio_width+`px`;
                    radio3_1.style.top = y-radio_height+`px`;
                    radio3_1.addEventListener('click',function(){
                        move_radio31 = "false";//ok
                        radio3_1.classList.remove('radio_move');
                    });
                }
            });
        }else{
            judge_radio31="false";//ok
        }
    }
});

//3-2*********************************************

var judge_radio32 = "false"; //マウス座標が要素内にあれば"true"
var move_radio32 = "false"; //judge_radio1がtrueのときに要素をクリックしたら"true"
document.addEventListener('mousemove', function(event){
    // マウスの座標を取得
    const x = event.clientX;
    const y = event.clientY;
    if(document.getElementById('radio3_2')){//id=radio1が存在するとき
        const radio3_2 = document.getElementById('radio3_2');
        const rect = radio3_2.getBoundingClientRect(); // 要素の座標を取得
        //要素の座標を格納
        const radio_x_left = rect.left;//左
        const radio_x_right = rect.right-25;//右 ※ズームボタン考慮
        const radio_y_top = rect.top;//上
        const radio_y_bottom = rect.bottom;//下 ※ボトム
        const radio_width = (rect.right - rect.left)/2; //要素の横幅の半分
        const radio_height = (rect.bottom - rect.top)/2; //要素の縦幅の半分　※これで中心に来る
        if(x >= radio_x_left && x <= radio_x_right && y <= radio_y_bottom && y >= radio_y_top){//マウス座標が要素内にあれば
            judge_radio32="true";
            radio3_2.addEventListener('click',function(){
                move_radio32 = "true";//ok
                radio3_2.classList.add('radio_move');
            });
            document.addEventListener('mousemove',function(){
                if(move_radio32 == "true"){
                    radio3_2.style.left = x-radio_width+`px`;
                    radio3_2.style.top = y-radio_height+`px`;
                    radio3_2.addEventListener('click',function(){
                        move_radio32 = "false";//ok
                        radio3_2.classList.remove('radio_move');
                    });
                }
            });
        }else{
            judge_radio32="false";//ok
        }
    }
});

//3-3*********************************************

var judge_radio33 = "false"; //マウス座標が要素内にあれば"true"
var move_radio33 = "false"; //judge_radio1がtrueのときに要素をクリックしたら"true"
document.addEventListener('mousemove', function(event){
    // マウスの座標を取得
    const x = event.clientX;
    const y = event.clientY;
    if(document.getElementById('radio3_3')){//id=radio1が存在するとき
        const radio3_3 = document.getElementById('radio3_3');
        const rect = radio3_3.getBoundingClientRect(); // 要素の座標を取得
        //要素の座標を格納
        const radio_x_left = rect.left;//左
        const radio_x_right = rect.right-25;//右 ※ズームボタン考慮
        const radio_y_top = rect.top;//上
        const radio_y_bottom = rect.bottom;//下 ※ボトム
        const radio_width = (rect.right - rect.left)/2; //要素の横幅の半分
        const radio_height = (rect.bottom - rect.top)/2; //要素の縦幅の半分　※これで中心に来る
        if(x >= radio_x_left && x <= radio_x_right && y <= radio_y_bottom && y >= radio_y_top){//マウス座標が要素内にあれば
            judge_radio33="true";
            radio3_3.addEventListener('click',function(){
                move_radio33 = "true";//ok
                radio3_3.classList.add('radio_move');
            });
            document.addEventListener('mousemove',function(){
                if(move_radio33 == "true"){
                    radio3_3.style.left = x-radio_width+`px`;
                    radio3_3.style.top = y-radio_height+`px`;
                    radio3_3.addEventListener('click',function(){
                        move_radio33 = "false";//ok
                        radio3_3.classList.remove('radio_move');
                    });
                }
            });
        }else{
            judge_radio33="false";//ok
        }
    }
});

//3-4*********************************************

var judge_radio34 = "false"; //マウス座標が要素内にあれば"true"
var move_radio34 = "false"; //judge_radio1がtrueのときに要素をクリックしたら"true"
document.addEventListener('mousemove', function(event){
    // マウスの座標を取得
    const x = event.clientX;
    const y = event.clientY;
    if(document.getElementById('radio3_4')){//id=radio1が存在するとき
        const radio3_4 = document.getElementById('radio3_4');
        const rect = radio3_4.getBoundingClientRect(); // 要素の座標を取得
        //要素の座標を格納
        const radio_x_left = rect.left;//左
        const radio_x_right = rect.right-25;//右 ※ズームボタン考慮
        const radio_y_top = rect.top;//上
        const radio_y_bottom = rect.bottom;//下 ※ボトム
        const radio_width = (rect.right - rect.left)/2; //要素の横幅の半分
        const radio_height = (rect.bottom - rect.top)/2; //要素の縦幅の半分　※これで中心に来る
        if(x >= radio_x_left && x <= radio_x_right && y <= radio_y_bottom && y >= radio_y_top){//マウス座標が要素内にあれば
            judge_radio34="true";
            radio3_4.addEventListener('click',function(){
                move_radio34 = "true";//ok
                radio3_4.classList.add('radio_move');
            });
            document.addEventListener('mousemove',function(){
                if(move_radio34 == "true"){
                    radio3_4.style.left = x-radio_width+`px`;
                    radio3_4.style.top = y-radio_height+`px`;
                    radio3_4.addEventListener('click',function(){
                        move_radio34 = "false";//ok
                        radio3_4.classList.remove('radio_move');
                    });
                }
            });
        }else{
            judge_radio34="false";//ok
        }
    }
});

//3-5*********************************************

var judge_radio35 = "false"; //マウス座標が要素内にあれば"true"
var move_radio35 = "false"; //judge_radio1がtrueのときに要素をクリックしたら"true"
document.addEventListener('mousemove', function(event){
    // マウスの座標を取得
    const x = event.clientX;
    const y = event.clientY;
    if(document.getElementById('radio3_5')){//id=radio1が存在するとき
        const radio3_5 = document.getElementById('radio3_5');
        const rect = radio3_5.getBoundingClientRect(); // 要素の座標を取得
        //要素の座標を格納
        const radio_x_left = rect.left;//左
        const radio_x_right = rect.right-25;//右 ※ズームボタン考慮
        const radio_y_top = rect.top;//上
        const radio_y_bottom = rect.bottom;//下 ※ボトム
        const radio_width = (rect.right - rect.left)/2; //要素の横幅の半分
        const radio_height = (rect.bottom - rect.top)/2; //要素の縦幅の半分　※これで中心に来る
        if(x >= radio_x_left && x <= radio_x_right && y <= radio_y_bottom && y >= radio_y_top){//マウス座標が要素内にあれば
            judge_radio35="true";
            radio3_5.addEventListener('click',function(){
                move_radio35 = "true";//ok
                radio3_5.classList.add('radio_move');
            });
            document.addEventListener('mousemove',function(){
                if(move_radio35 == "true"){
                    radio3_5.style.left = x-radio_width+`px`;
                    radio3_5.style.top = y-radio_height+`px`;
                    radio3_5.addEventListener('click',function(){
                        move_radio35 = "false";//ok
                        radio3_5.classList.remove('radio_move');
                    });
                }
            });
        }else{
            judge_radio35="false";//ok
        }
    }
});

//3-6*********************************************

var judge_radio36 = "false"; //マウス座標が要素内にあれば"true"
var move_radio36 = "false"; //judge_radio1がtrueのときに要素をクリックしたら"true"
document.addEventListener('mousemove', function(event){
    // マウスの座標を取得
    const x = event.clientX;
    const y = event.clientY;
    if(document.getElementById('radio3_6')){//id=radio1が存在するとき
        const radio3_6 = document.getElementById('radio3_6');
        const rect = radio3_6.getBoundingClientRect(); // 要素の座標を取得
        //要素の座標を格納
        const radio_x_left = rect.left;//左
        const radio_x_right = rect.right-25;//右 ※ズームボタン考慮
        const radio_y_top = rect.top;//上
        const radio_y_bottom = rect.bottom;//下 ※ボトム
        const radio_width = (rect.right - rect.left)/2; //要素の横幅の半分
        const radio_height = (rect.bottom - rect.top)/2; //要素の縦幅の半分　※これで中心に来る
        if(x >= radio_x_left && x <= radio_x_right && y <= radio_y_bottom && y >= radio_y_top){//マウス座標が要素内にあれば
            judge_radio36="true";
            radio3_6.addEventListener('click',function(){
                move_radio36 = "true";//ok
                radio3_6.classList.add('radio_move');
            });
            document.addEventListener('mousemove',function(){
                if(move_radio36 == "true"){
                    radio3_6.style.left = x-radio_width+`px`;
                    radio3_6.style.top = y-radio_height+`px`;
                    radio3_6.addEventListener('click',function(){
                        move_radio36 = "false";//ok
                        radio3_6.classList.remove('radio_move');
                    });
                }
            });
        }else{
            judge_radio36="false";//ok
        }
    }
});

//3-7*********************************************

var judge_radio37 = "false"; //マウス座標が要素内にあれば"true"
var move_radio37 = "false"; //judge_radio1がtrueのときに要素をクリックしたら"true"
document.addEventListener('mousemove', function(event){
    // マウスの座標を取得
    const x = event.clientX;
    const y = event.clientY;
    if(document.getElementById('radio3_7')){//id=radio1が存在するとき
        const radio3_7 = document.getElementById('radio3_7');
        const rect = radio3_7.getBoundingClientRect(); // 要素の座標を取得
        //要素の座標を格納
        const radio_x_left = rect.left;//左
        const radio_x_right = rect.right-25;//右 ※ズームボタン考慮
        const radio_y_top = rect.top;//上
        const radio_y_bottom = rect.bottom;//下 ※ボトム
        const radio_width = (rect.right - rect.left)/2; //要素の横幅の半分
        const radio_height = (rect.bottom - rect.top)/2; //要素の縦幅の半分　※これで中心に来る
        if(x >= radio_x_left && x <= radio_x_right && y <= radio_y_bottom && y >= radio_y_top){//マウス座標が要素内にあれば
            judge_radio37="true";
            radio3_7.addEventListener('click',function(){
                move_radio37 = "true";//ok
                radio3_7.classList.add('radio_move');
            });
            document.addEventListener('mousemove',function(){
                if(move_radio37 == "true"){
                    radio3_7.style.left = x-radio_width+`px`;
                    radio3_7.style.top = y-radio_height+`px`;
                    radio3_7.addEventListener('click',function(){
                        move_radio37 = "false";//ok
                        radio3_7.classList.remove('radio_move');
                    });
                }
            });
        }else{
            judge_radio37="false";//ok
        }
    }
});

//3-8*********************************************

var judge_radio38 = "false"; //マウス座標が要素内にあれば"true"
var move_radio38 = "false"; //judge_radio1がtrueのときに要素をクリックしたら"true"
document.addEventListener('mousemove', function(event){
    // マウスの座標を取得
    const x = event.clientX;
    const y = event.clientY;
    if(document.getElementById('radio3_8')){//id=radio1が存在するとき
        const radio3_8 = document.getElementById('radio3_8');
        const rect = radio3_8.getBoundingClientRect(); // 要素の座標を取得
        //要素の座標を格納
        const radio_x_left = rect.left;//左
        const radio_x_right = rect.right-25;//右 ※ズームボタン考慮
        const radio_y_top = rect.top;//上
        const radio_y_bottom = rect.bottom;//下 ※ボトム
        const radio_width = (rect.right - rect.left)/2; //要素の横幅の半分
        const radio_height = (rect.bottom - rect.top)/2; //要素の縦幅の半分　※これで中心に来る
        if(x >= radio_x_left && x <= radio_x_right && y <= radio_y_bottom && y >= radio_y_top){//マウス座標が要素内にあれば
            judge_radio38="true";
            radio3_8.addEventListener('click',function(){
                move_radio38 = "true";//ok
                radio3_8.classList.add('radio_move');
            });
            document.addEventListener('mousemove',function(){
                if(move_radio38 == "true"){
                    radio3_8.style.left = x-radio_width+`px`;
                    radio3_8.style.top = y-radio_height+`px`;
                    radio3_8.addEventListener('click',function(){
                        move_radio38 = "false";//ok
                        radio3_8.classList.remove('radio_move');
                    });
                }
            });
        }else{
            judge_radio38="false";//ok
        }
    }
});

//4-1*********************************************

var judge_radio41 = "false"; //マウス座標が要素内にあれば"true"
var move_radio41 = "false"; //judge_radio1がtrueのときに要素をクリックしたら"true"
document.addEventListener('mousemove', function(event){
    // マウスの座標を取得
    const x = event.clientX;
    const y = event.clientY;
    if(document.getElementById('radio4_1')){//id=radio1が存在するとき
        const radio4_1 = document.getElementById('radio4_1');
        const rect = radio4_1.getBoundingClientRect(); // 要素の座標を取得
        //要素の座標を格納
        const radio_x_left = rect.left;//左
        const radio_x_right = rect.right-25;//右 ※ズームボタン考慮
        const radio_y_top = rect.top;//上
        const radio_y_bottom = rect.bottom;//下 ※ボトム
        const radio_width = (rect.right - rect.left)/2; //要素の横幅の半分
        const radio_height = (rect.bottom - rect.top)/2; //要素の縦幅の半分　※これで中心に来る
        if(x >= radio_x_left && x <= radio_x_right && y <= radio_y_bottom && y >= radio_y_top){//マウス座標が要素内にあれば
            judge_radio41="true";
            radio4_1.addEventListener('click',function(){
                move_radio41 = "true";//ok
                radio4_1.classList.add('radio_move');
            });
            document.addEventListener('mousemove',function(){
                if(move_radio41 == "true"){
                    radio4_1.style.left = x-radio_width+`px`;
                    radio4_1.style.top = y-radio_height+`px`;
                    radio4_1.addEventListener('click',function(){
                        move_radio41 = "false";//ok
                        radio4_1.classList.remove('radio_move');
                    });
                }
            });
        }else{
            judge_radio41="false";//ok
        }
    }
});

//4-2*********************************************

var judge_radio42 = "false"; //マウス座標が要素内にあれば"true"
var move_radio42 = "false"; //judge_radio1がtrueのときに要素をクリックしたら"true"
document.addEventListener('mousemove', function(event){
    // マウスの座標を取得
    const x = event.clientX;
    const y = event.clientY;
    if(document.getElementById('radio4_2')){//id=radio1が存在するとき
        const radio4_2 = document.getElementById('radio4_2');
        const rect = radio4_2.getBoundingClientRect(); // 要素の座標を取得
        //要素の座標を格納
        const radio_x_left = rect.left;//左
        const radio_x_right = rect.right-25;//右 ※ズームボタン考慮
        const radio_y_top = rect.top;//上
        const radio_y_bottom = rect.bottom;//下 ※ボトム
        const radio_width = (rect.right - rect.left)/2; //要素の横幅の半分
        const radio_height = (rect.bottom - rect.top)/2; //要素の縦幅の半分　※これで中心に来る
        if(x >= radio_x_left && x <= radio_x_right && y <= radio_y_bottom && y >= radio_y_top){//マウス座標が要素内にあれば
            judge_radio42="true";
            radio4_2.addEventListener('click',function(){
                move_radio42 = "true";//ok
                radio4_2.classList.add('radio_move');
            });
            document.addEventListener('mousemove',function(){
                if(move_radio42 == "true"){
                    radio4_2.style.left = x-radio_width+`px`;
                    radio4_2.style.top = y-radio_height+`px`;
                    radio4_2.addEventListener('click',function(){
                        move_radio42 = "false";//ok
                        radio4_2.classList.remove('radio_move');
                    });
                }
            });
        }else{
            judge_radio42="false";//ok
        }
    }
});

//4-3*********************************************

var judge_radio43 = "false"; //マウス座標が要素内にあれば"true"
var move_radio43 = "false"; //judge_radio1がtrueのときに要素をクリックしたら"true"
document.addEventListener('mousemove', function(event){
    // マウスの座標を取得
    const x = event.clientX;
    const y = event.clientY;
    if(document.getElementById('radio4_3')){//id=radio1が存在するとき
        const radio4_3 = document.getElementById('radio4_3');
        const rect = radio4_3.getBoundingClientRect(); // 要素の座標を取得
        //要素の座標を格納
        const radio_x_left = rect.left;//左
        const radio_x_right = rect.right-25;//右 ※ズームボタン考慮
        const radio_y_top = rect.top;//上
        const radio_y_bottom = rect.bottom;//下 ※ボトム
        const radio_width = (rect.right - rect.left)/2; //要素の横幅の半分
        const radio_height = (rect.bottom - rect.top)/2; //要素の縦幅の半分　※これで中心に来る
        if(x >= radio_x_left && x <= radio_x_right && y <= radio_y_bottom && y >= radio_y_top){//マウス座標が要素内にあれば
            judge_radio43="true";
            radio4_3.addEventListener('click',function(){
                move_radio43 = "true";//ok
                radio4_3.classList.add('radio_move');
            });
            document.addEventListener('mousemove',function(){
                if(move_radio43 == "true"){
                    radio4_3.style.left = x-radio_width+`px`;
                    radio4_3.style.top = y-radio_height+`px`;
                    radio4_3.addEventListener('click',function(){
                        move_radio43 = "false";//ok
                        radio4_3.classList.remove('radio_move');
                    });
                }
            });
        }else{
            judge_radio43="false";//ok
        }
    }
});

//4-4*********************************************

var judge_radio44 = "false"; //マウス座標が要素内にあれば"true"
var move_radio44 = "false"; //judge_radio1がtrueのときに要素をクリックしたら"true"
document.addEventListener('mousemove', function(event){
    // マウスの座標を取得
    const x = event.clientX;
    const y = event.clientY;
    if(document.getElementById('radio4_4')){//id=radio1が存在するとき
        const radio4_4 = document.getElementById('radio4_4');
        const rect = radio4_4.getBoundingClientRect(); // 要素の座標を取得
        //要素の座標を格納
        const radio_x_left = rect.left;//左
        const radio_x_right = rect.right-25;//右 ※ズームボタン考慮
        const radio_y_top = rect.top;//上
        const radio_y_bottom = rect.bottom;//下 ※ボトム
        const radio_width = (rect.right - rect.left)/2; //要素の横幅の半分
        const radio_height = (rect.bottom - rect.top)/2; //要素の縦幅の半分　※これで中心に来る
        if(x >= radio_x_left && x <= radio_x_right && y <= radio_y_bottom && y >= radio_y_top){//マウス座標が要素内にあれば
            judge_radio44="true";
            radio4_4.addEventListener('click',function(){
                move_radio44 = "true";//ok
                radio4_4.classList.add('radio_move');
            });
            document.addEventListener('mousemove',function(){
                if(move_radio44 == "true"){
                    radio4_4.style.left = x-radio_width+`px`;
                    radio4_4.style.top = y-radio_height+`px`;
                    radio4_4.addEventListener('click',function(){
                        move_radio44 = "false";//ok
                        radio4_4.classList.remove('radio_move');
                    });
                }
            });
        }else{
            judge_radio44="false";//ok
        }
    }
});

//4-5*********************************************

var judge_radio45 = "false"; //マウス座標が要素内にあれば"true"
var move_radio45 = "false"; //judge_radio1がtrueのときに要素をクリックしたら"true"
document.addEventListener('mousemove', function(event){
    // マウスの座標を取得
    const x = event.clientX;
    const y = event.clientY;
    if(document.getElementById('radio4_5')){//id=radio1が存在するとき
        const radio4_5 = document.getElementById('radio4_5');
        const rect = radio4_5.getBoundingClientRect(); // 要素の座標を取得
        //要素の座標を格納
        const radio_x_left = rect.left;//左
        const radio_x_right = rect.right-25;//右 ※ズームボタン考慮
        const radio_y_top = rect.top;//上
        const radio_y_bottom = rect.bottom;//下 ※ボトム
        const radio_width = (rect.right - rect.left)/2; //要素の横幅の半分
        const radio_height = (rect.bottom - rect.top)/2; //要素の縦幅の半分　※これで中心に来る
        if(x >= radio_x_left && x <= radio_x_right && y <= radio_y_bottom && y >= radio_y_top){//マウス座標が要素内にあれば
            judge_radio45="true";
            radio4_5.addEventListener('click',function(){
                move_radio45 = "true";//ok
                radio4_5.classList.add('radio_move');
            });
            document.addEventListener('mousemove',function(){
                if(move_radio45 == "true"){
                    radio4_5.style.left = x-radio_width+`px`;
                    radio4_5.style.top = y-radio_height+`px`;
                    radio4_5.addEventListener('click',function(){
                        move_radio45 = "false";//ok
                        radio4_5.classList.remove('radio_move');
                    });
                }
            });
        }else{
            judge_radio45="false";//ok
        }
    }
});

//4-6*********************************************

var judge_radio46 = "false"; //マウス座標が要素内にあれば"true"
var move_radio46 = "false"; //judge_radio1がtrueのときに要素をクリックしたら"true"
document.addEventListener('mousemove', function(event){
    // マウスの座標を取得
    const x = event.clientX;
    const y = event.clientY;
    if(document.getElementById('radio4_6')){//id=radio1が存在するとき
        const radio4_6 = document.getElementById('radio4_6');
        const rect = radio4_6.getBoundingClientRect(); // 要素の座標を取得
        //要素の座標を格納
        const radio_x_left = rect.left;//左
        const radio_x_right = rect.right-25;//右 ※ズームボタン考慮
        const radio_y_top = rect.top;//上
        const radio_y_bottom = rect.bottom;//下 ※ボトム
        const radio_width = (rect.right - rect.left)/2; //要素の横幅の半分
        const radio_height = (rect.bottom - rect.top)/2; //要素の縦幅の半分　※これで中心に来る
        if(x >= radio_x_left && x <= radio_x_right && y <= radio_y_bottom && y >= radio_y_top){//マウス座標が要素内にあれば
            judge_radio46="true";
            radio4_6.addEventListener('click',function(){
                move_radio46 = "true";//ok
                radio4_6.classList.add('radio_move');
            });
            document.addEventListener('mousemove',function(){
                if(move_radio46 == "true"){
                    radio4_6.style.left = x-radio_width+`px`;
                    radio4_6.style.top = y-radio_height+`px`;
                    radio4_6.addEventListener('click',function(){
                        move_radio46 = "false";//ok
                        radio4_6.classList.remove('radio_move');
                    });
                }
            });
        }else{
            judge_radio46="false";//ok
        }
    }
});

//4-7*********************************************

var judge_radio47 = "false"; //マウス座標が要素内にあれば"true"
var move_radio47 = "false"; //judge_radio1がtrueのときに要素をクリックしたら"true"
document.addEventListener('mousemove', function(event){
    // マウスの座標を取得
    const x = event.clientX;
    const y = event.clientY;
    if(document.getElementById('radio4_7')){//id=radio1が存在するとき
        const radio4_7 = document.getElementById('radio4_7');
        const rect = radio4_7.getBoundingClientRect(); // 要素の座標を取得
        //要素の座標を格納
        const radio_x_left = rect.left;//左
        const radio_x_right = rect.right-25;//右 ※ズームボタン考慮
        const radio_y_top = rect.top;//上
        const radio_y_bottom = rect.bottom;//下 ※ボトム
        const radio_width = (rect.right - rect.left)/2; //要素の横幅の半分
        const radio_height = (rect.bottom - rect.top)/2; //要素の縦幅の半分　※これで中心に来る
        if(x >= radio_x_left && x <= radio_x_right && y <= radio_y_bottom && y >= radio_y_top){//マウス座標が要素内にあれば
            judge_radio47="true";
            radio4_7.addEventListener('click',function(){
                move_radio47 = "true";//ok
                radio4_7.classList.add('radio_move');
            });
            document.addEventListener('mousemove',function(){
                if(move_radio47 == "true"){
                    radio4_7.style.left = x-radio_width+`px`;
                    radio4_7.style.top = y-radio_height+`px`;
                    radio4_7.addEventListener('click',function(){
                        move_radio47 = "false";//ok
                        radio4_7.classList.remove('radio_move');
                    });
                }
            });
        }else{
            judge_radio47="false";//ok
        }
    }
});

//4-8*********************************************

var judge_radio48 = "false"; //マウス座標が要素内にあれば"true"
var move_radio48 = "false"; //judge_radio1がtrueのときに要素をクリックしたら"true"
document.addEventListener('mousemove', function(event){
    // マウスの座標を取得
    const x = event.clientX;
    const y = event.clientY;
    if(document.getElementById('radio4_8')){//id=radio1が存在するとき
        const radio4_8 = document.getElementById('radio4_8');
        const rect = radio4_8.getBoundingClientRect(); // 要素の座標を取得
        //要素の座標を格納
        const radio_x_left = rect.left;//左
        const radio_x_right = rect.right-25;//右 ※ズームボタン考慮
        const radio_y_top = rect.top;//上
        const radio_y_bottom = rect.bottom;//下 ※ボトム
        const radio_width = (rect.right - rect.left)/2; //要素の横幅の半分
        const radio_height = (rect.bottom - rect.top)/2; //要素の縦幅の半分　※これで中心に来る
        if(x >= radio_x_left && x <= radio_x_right && y <= radio_y_bottom && y >= radio_y_top){//マウス座標が要素内にあれば
            judge_radio48="true";
            radio4_8.addEventListener('click',function(){
                move_radio48 = "true";//ok
                radio4_8.classList.add('radio_move');
            });
            document.addEventListener('mousemove',function(){
                if(move_radio48 == "true"){
                    radio4_8.style.left = x-radio_width+`px`;
                    radio4_8.style.top = y-radio_height+`px`;
                    radio4_8.addEventListener('click',function(){
                        move_radio48 = "false";//ok
                        radio4_8.classList.remove('radio_move');
                    });
                }
            });
        }else{
            judge_radio48="false";//ok
        }
    }
});

//******************************　ラジオ　グループ別高さ自動調節　********************************************************************************** */

var auto_style = 0;
function auto_style_change(){
    auto_style ++;
}

//監視1-1
setInterval(() => {
    if(auto_style % 2 != 0){
        if(document.getElementById('radio1_1')){
            const radio1_1 = document.getElementById('radio1_1');
            const rect = radio1_1.getBoundingClientRect();
            const radio_height = rect.height;//ラジオ１－１の高さ
            const radio_width = rect.width;//ラジオ１－１の横幅
            if(document.getElementById('radio1_2')){
                const radio = document.getElementById('radio1_2');
                radio.style.height=radio_height + "px";
                radio.style.width=radio_width + "px";
            }
            if(document.getElementById('radio1_3')){
                const radio = document.getElementById('radio1_3');
                radio.style.height=radio_height + "px";
                radio.style.width=radio_width + "px";
            }
            if(document.getElementById('radio1_4')){
                const radio = document.getElementById('radio1_4');
                radio.style.height=radio_height + "px";
                radio.style.width=radio_width + "px";
            }
            if(document.getElementById('radio1_5')){
                const radio = document.getElementById('radio1_5');
                radio.style.height=radio_height + "px";
                radio.style.width=radio_width + "px";
            }
            if(document.getElementById('radio1_6')){
                const radio = document.getElementById('radio1_6');
                radio.style.height=radio_height + "px";
                radio.style.width=radio_width + "px";
            }
            if(document.getElementById('radio1_7')){
                const radio = document.getElementById('radio1_7');
                radio.style.height=radio_height + "px";
                radio.style.width=radio_width + "px";
            }
            if(document.getElementById('radio1_8')){
                const radio = document.getElementById('radio1_8');
                radio.style.height=radio_height + "px";
                radio.style.width=radio_width + "px";
            }
        }   
    }
}, 10);

//監視2-1
setInterval(() => {
    if(auto_style % 2 != 0){
        if(document.getElementById('radio2_1')){
            const radio2_1 = document.getElementById('radio2_1');
            const rect = radio2_1.getBoundingClientRect();
            const radio_height = rect.height;//ラジオ１－１の高さ
            const radio_width = rect.width;//ラジオ１－１の横幅
            if(document.getElementById('radio2_2')){
                const radio = document.getElementById('radio2_2');
                radio.style.height=radio_height + "px";
                radio.style.width=radio_width + "px";
            }
            if(document.getElementById('radio2_3')){
                const radio = document.getElementById('radio2_3');
                radio.style.height=radio_height + "px";
                radio.style.width=radio_width + "px";
            }
            if(document.getElementById('radio2_4')){
                const radio = document.getElementById('radio2_4');
                radio.style.height=radio_height + "px";
                radio.style.width=radio_width + "px";
            }
            if(document.getElementById('radio2_5')){
                const radio = document.getElementById('radio2_5');
                radio.style.height=radio_height + "px";
                radio.style.width=radio_width + "px";
            }
            if(document.getElementById('radio2_6')){
                const radio = document.getElementById('radio2_6');
                radio.style.height=radio_height + "px";
                radio.style.width=radio_width + "px";
            }
            if(document.getElementById('radio2_7')){
                const radio = document.getElementById('radio2_7');
                radio.style.height=radio_height + "px";
                radio.style.width=radio_width + "px";
            }
            if(document.getElementById('radio2_8')){
                const radio = document.getElementById('radio2_8');
                radio.style.height=radio_height + "px";
                radio.style.width=radio_width + "px";
            }
        }   
    }
}, 10);

//監視3-1
setInterval(() => {
    if(auto_style % 2 != 0){
        if(document.getElementById('radio3_1')){
            const radio3_1 = document.getElementById('radio3_1');
            const rect = radio3_1.getBoundingClientRect();
            const radio_height = rect.height;//ラジオ１－１の高さ
            const radio_width = rect.width;//ラジオ１－１の横幅
            if(document.getElementById('radio3_2')){
                const radio = document.getElementById('radio3_2');
                radio.style.height=radio_height + "px";
                radio.style.width=radio_width + "px";
            }
            if(document.getElementById('radio3_3')){
                const radio = document.getElementById('radio3_3');
                radio.style.height=radio_height + "px";
                radio.style.width=radio_width + "px";
            }
            if(document.getElementById('radio3_4')){
                const radio = document.getElementById('radio3_4');
                radio.style.height=radio_height + "px";
                radio.style.width=radio_width + "px";
            }
            if(document.getElementById('radio3_5')){
                const radio = document.getElementById('radio3_5');
                radio.style.height=radio_height + "px";
                radio.style.width=radio_width + "px";
            }
            if(document.getElementById('radio3_6')){
                const radio = document.getElementById('radio3_6');
                radio.style.height=radio_height + "px";
                radio.style.width=radio_width + "px";
            }
            if(document.getElementById('radio3_7')){
                const radio = document.getElementById('radio3_7');
                radio.style.height=radio_height + "px";
                radio.style.width=radio_width + "px";
            }
            if(document.getElementById('radio3_8')){
                const radio = document.getElementById('radio3_8');
                radio.style.height=radio_height + "px";
                radio.style.width=radio_width + "px";
            }
        }   
    }
}, 10);

//監視4-1
setInterval(() => {
    if(auto_style % 2 != 0){
        if(document.getElementById('radio4_1')){
            const radio4_1 = document.getElementById('radio4_1');
            const rect = radio4_1.getBoundingClientRect();
            const radio_height = rect.height;//ラジオ１－１の高さ
            const radio_width = rect.width;//ラジオ１－１の横幅
            if(document.getElementById('radio4_2')){
                const radio = document.getElementById('radio4_2');
                radio.style.height=radio_height + "px";
                radio.style.width=radio_width + "px";
            }
            if(document.getElementById('radio4_3')){
                const radio = document.getElementById('radio4_3');
                radio.style.height=radio_height + "px";
                radio.style.width=radio_width + "px";
            }
            if(document.getElementById('radio4_4')){
                const radio = document.getElementById('radio4_4');
                radio.style.height=radio_height + "px";
                radio.style.width=radio_width + "px";
            }
            if(document.getElementById('radio4_5')){
                const radio = document.getElementById('radio4_5');
                radio.style.height=radio_height + "px";
                radio.style.width=radio_width + "px";
            }
            if(document.getElementById('radio4_6')){
                const radio = document.getElementById('radio4_6');
                radio.style.height=radio_height + "px";
                radio.style.width=radio_width + "px";
            }
            if(document.getElementById('radio4_7')){
                const radio = document.getElementById('radio4_7');
                radio.style.height=radio_height + "px";
                radio.style.width=radio_width + "px";
            }
            if(document.getElementById('radio4_8')){
                const radio = document.getElementById('radio4_8');
                radio.style.height=radio_height + "px";
                radio.style.width=radio_width + "px";
            }
        }   
    }
}, 10);

//******************************要素の背景色を透明化********************************************************************************** */

var auto_style2 = 0;
function hide_background(){
    auto_style2 ++;
    toumei_background();
}

function toumei_background(){
    setInterval(() => {
    if(auto_style2 % 2 != 0){
        //label
        for(var i = 1; i <= 10; i++){
            if(document.getElementById("label"+i)){
                var label = document.getElementById("label"+i);
                label.classList.add('back_none');
            }
        }
        //textbox
        for(var i = 1; i <= 10; i++){
            if(document.getElementById("textbox"+i)){
                var textbox = document.getElementById("textbox"+i);
                textbox.classList.add('back_none');
            }
        }
        //radio1
        for(var i = 1; i <= 8; i++){
            if(document.getElementById("radio1_"+i)){
                var radio1 = document.getElementById("radio1_"+i);
                radio1.classList.add('back_none');
            }
        }
        //radio2
        for(var i = 1; i <= 8; i++){
            if(document.getElementById("radio2_"+i)){
                var radio2 = document.getElementById("radio2_"+i);
                radio2.classList.add('back_none');
            }
        }
        //radio3
        for(var i = 1; i <= 8; i++){
            if(document.getElementById("radio3_"+i)){
                var radio3 = document.getElementById("radio3_"+i);
                radio3.classList.add('back_none');
            }
        }
        //radio4
        for(var i = 1; i <= 8; i++){
            if(document.getElementById("radio4_"+i)){
                var radio4 = document.getElementById("radio4_"+i);
                radio4.classList.add('back_none');
            }
        }
        //command
        for(var i = 1; i <= 10; i++){
            if(document.getElementById("command"+i)){
                var command = document.getElementById("command"+i);
                command.classList.add('back_none');
            }
        }
        //table1 th
        for(var i = 1; i <= 6; i++){
            if(document.getElementById("table1_th"+i)){
                var th1 = document.getElementById("table1_th"+i);
                th1.classList.add('back_none');
            }
        }
        //table1 td 
        for(var i = 1; i <= 6; i++){
            for(var x = 1; x <= 8; x++){
                if(document.getElementById("table1_th"+i+"_row"+x)){
                    var td = document.getElementById("table1_th"+i+"_row"+x);
                    td.classList.add('back_none');
                }
            }
        }
        //table2 th
        for(var i = 1; i <= 6; i++){
            if(document.getElementById("table1_th"+i)){
                var th1 = document.getElementById("table1_th"+i);
                th1.classList.add('back_none');
            }
        }
        //table2 td 
        for(var i = 1; i <= 6; i++){
            for(var x = 1; x <= 8; x++){
                if(document.getElementById("table1_th"+i+"_row"+x)){
                    var td = document.getElementById("table1_th"+i+"_row"+x);
                    td.classList.add('back_none');
                }
            }
        }
    }else{
        //label
        for(var i = 1; i <= 10; i++){
            if(document.getElementById("label"+i)){
                var label = document.getElementById("label"+i);
                label.classList.remove('back_none');
            }
        }
        //textbox
        for(var i = 1; i <= 10; i++){
            if(document.getElementById("textbox"+i)){
                var textbox = document.getElementById("textbox"+i);
                textbox.classList.remove('back_none');
            }
        }
        //radio1
        for(var i = 1; i <= 8; i++){
            if(document.getElementById("radio1_"+i)){
                var radio1 = document.getElementById("radio1_"+i);
                radio1.classList.remove('back_none');
            }
        }
        //radio2
        for(var i = 1; i <= 8; i++){
            if(document.getElementById("radio2_"+i)){
                var radio2 = document.getElementById("radio2_"+i);
                radio2.classList.remove('back_none');
            }
        }
        //radio3
        for(var i = 1; i <= 8; i++){
            if(document.getElementById("radio3_"+i)){
                var radio3 = document.getElementById("radio3_"+i);
                radio3.classList.remove('back_none');
            }
        }
        //radio4
        for(var i = 1; i <= 8; i++){
            if(document.getElementById("radio4_"+i)){
                var radio4 = document.getElementById("radio4_"+i);
                radio4.classList.remove('back_none');
            }
        }
        //command
        for(var i = 1; i <= 10; i++){
            if(document.getElementById("command"+i)){
                var command = document.getElementById("command"+i);
                command.classList.remove('back_none');
            }
        }
        //table1 th
        for(var i = 1; i <= 6; i++){
            if(document.getElementById("table1_th"+i)){
                var th1 = document.getElementById("table1_th"+i);
                th1.classList.remove('back_none');
            }
        }
        //table1 td 
        for(var i = 1; i <= 6; i++){
            for(var x = 1; x <= 8; x++){
                if(document.getElementById("table1_th"+i+"_row"+x)){
                    var td = document.getElementById("table1_th"+i+"_row"+x);
                    td.classList.remove('back_none');
                }
            }
        }
        //table2 th
        for(var i = 1; i <= 6; i++){
            if(document.getElementById("table1_th"+i)){
                var th1 = document.getElementById("table1_th"+i);
                th1.classList.remove('back_none');
            }
        }
        //table2 td 
        for(var i = 1; i <= 6; i++){
            for(var x = 1; x <= 8; x++){
                if(document.getElementById("table1_th"+i+"_row"+x)){
                    var td = document.getElementById("table1_th"+i+"_row"+x);
                    td.classList.remove('back_none');
                }
            }
        }
    }
}, 100);
}

//******************************枠線を除去********************************************************************************** */

var auto_style3 = 0;
function delete_border(){
    auto_style3 ++;
    delete_border_super();
}

function delete_border_super(){
    if(auto_style3 % 2 != 0){
        //label
        for(var i = 1; i <= 10; i++){
            if(document.getElementById("label"+i)){
                var label = document.getElementById("label"+i);
                label.classList.add('border_none');
            }
        }
        //radio1
        for(var i = 1; i <= 8; i++){
            if(document.getElementById("radio1_"+i)){
                var radio1 = document.getElementById("radio1_"+i);
                radio1.classList.add('border_none');
            }
        }
        //radio2
        for(var i = 1; i <= 8; i++){
            if(document.getElementById("radio2_"+i)){
                var radio2 = document.getElementById("radio2_"+i);
                radio2.classList.add('border_none');
            }
        }
        //radio3
        for(var i = 1; i <= 8; i++){
            if(document.getElementById("radio3_"+i)){
                var radio3 = document.getElementById("radio3_"+i);
                radio3.classList.add('border_none');
            }
        }
        //radio4
        for(var i = 1; i <= 8; i++){
            if(document.getElementById("radio4_"+i)){
                var radio4 = document.getElementById("radio4_"+i);
                radio4.classList.add('border_none');
            }
        }
    }else{
        //label
        for(var i = 1; i <= 10; i++){
            if(document.getElementById("label"+i)){
                var label = document.getElementById("label"+i);
                label.classList.remove('border_none');
            }
        }
        //radio1
        for(var i = 1; i <= 8; i++){
            if(document.getElementById("radio1_"+i)){
                var radio1 = document.getElementById("radio1_"+i);
                radio1.classList.remove('border_none');
            }
        }
        //radio2
        for(var i = 1; i <= 8; i++){
            if(document.getElementById("radio2_"+i)){
                var radio2 = document.getElementById("radio2_"+i);
                radio2.classList.remove('border_none');
            }
        }
        //radio3
        for(var i = 1; i <= 8; i++){
            if(document.getElementById("radio3_"+i)){
                var radio3 = document.getElementById("radio3_"+i);
                radio3.classList.remove('border_none');
            }
        }
        //radio4
        for(var i = 1; i <= 8; i++){
            if(document.getElementById("radio4_"+i)){
                var radio4 = document.getElementById("radio4_"+i);
                radio4.classList.remove('border_none');
            }
        }
    }
};

//******************************auto width********************************************************************************** */

var auto_style4 = 0;
function auto_width(){
    auto_style4 ++;
    // auto_width_super();
}

setInterval(() => {
    if(auto_style4 % 2 != 0){
        //label
        for(var i = 1; i <= 10; i++){
            if(document.getElementById("label"+i)){
                auto_width_common("label"+i);
            }
        }
        // //radio1
        // for(var i = 1; i <= 8; i++){
        //     if(document.getElementById("radio1_"+i)){
        //         auto_width_common("radio1_"+i);
        //     }
        // }
        // //radio2
        // for(var i = 1; i <= 8; i++){
        //     if(document.getElementById("radio2_"+i)){
        //         auto_width_common("radio2_"+i);
        //     }
        // }
        // //radio3
        // for(var i = 1; i <= 8; i++){
        //     if(document.getElementById("radio3_"+i)){
        //         auto_width_common("radio3_"+i);
        //     }
        // }
        // //radio4
        // for(var i = 1; i <= 8; i++){
        //     if(document.getElementById("radio4_"+i)){
        //         auto_width_common("radio4_"+i);
        //     }
        // }
        //command
        for(var i = 1; i <= 10; i++){
            if(document.getElementById("command"+i)){
                auto_width_common("command"+i);
            }
        }
    }
}, 100);

function auto_width_common(id){
    var element = document.getElementById(id);
            var text = element.value;
            var length = text.length;
            if(length!=""){
                var rect = element.getBoundingClientRect();
                element.style.width=rect.height * length +"px"
            }else{
                element.style.width="130px"
            }
}



//*******フォントサイズ動的変更****************************************************************************************************************************

//ラジオ1-1
var radio11_height_log = 0;//履歴用
var radio11_font = 22; //初期値固定フォントサイズ（可変）
setInterval(() => {
if(document.getElementById('radio1_1')){
    // alert("ok");//ok
    const radio = document.getElementById('radio1_1');
    const rect = radio.getBoundingClientRect(); // 要素の座標を取得
    //要素の座標を格納
    const radio_height = rect.bottom - rect.top;
    var last_heigth = radio_height;//最後に検出したheightを格納
    radio11_height_log++;//キー用のカウント
    radio.style.fontSize = last_heigth-10 + "px";//heightの単位もpxなのでそのまま代入でいい（余白分10px）
}
}, 10);

//ラジオ1-2
var radio12_height_log = 0;//履歴用
var radio12_font = 22; //初期値固定フォントサイズ（可変）
setInterval(() => {
if(document.getElementById('radio1_2')){
    // alert("ok");//ok
    const radio = document.getElementById('radio1_2');
    const rect = radio.getBoundingClientRect(); // 要素の座標を取得
    //要素の座標を格納
    const radio_height = rect.bottom - rect.top;
    var last_heigth = radio_height;//最後に検出したheightを格納
    radio12_height_log++;//キー用のカウント
    radio.style.fontSize = last_heigth-10 + "px";//heightの単位もpxなのでそのまま代入でいい（余白分10px）
}
}, 10);

//ラジオ1-3
var radio13_height_log = 0;//履歴用
var radio13_font = 22; //初期値固定フォントサイズ（可変）
setInterval(() => {
if(document.getElementById('radio1_3')){
    // alert("ok");//ok
    const radio = document.getElementById('radio1_3');
    const rect = radio.getBoundingClientRect(); // 要素の座標を取得
    //要素の座標を格納
    const radio_height = rect.bottom - rect.top;
    var last_heigth = radio_height;//最後に検出したheightを格納
    radio13_height_log++;//キー用のカウント
    radio.style.fontSize = last_heigth-10 + "px";//heightの単位もpxなのでそのまま代入でいい（余白分10px）
}
}, 10);

//ラジオ1-4
var radio14_height_log = 0;//履歴用
var radio14_font = 22; //初期値固定フォントサイズ（可変）
setInterval(() => {
if(document.getElementById('radio1_4')){
    // alert("ok");//ok
    const radio = document.getElementById('radio1_4');
    const rect = radio.getBoundingClientRect(); // 要素の座標を取得
    //要素の座標を格納
    const radio_height = rect.bottom - rect.top;
    var last_heigth = radio_height;//最後に検出したheightを格納
    radio14_height_log++;//キー用のカウント
    radio.style.fontSize = last_heigth-10 + "px";//heightの単位もpxなのでそのまま代入でいい（余白分10px）
}
}, 10);

//ラジオ1-5
var radio15_height_log = 0;//履歴用
var radio15_font = 22; //初期値固定フォントサイズ（可変）
setInterval(() => {
if(document.getElementById('radio1_5')){
    // alert("ok");//ok
    const radio = document.getElementById('radio1_5');
    const rect = radio.getBoundingClientRect(); // 要素の座標を取得
    //要素の座標を格納
    const radio_height = rect.bottom - rect.top;
    var last_heigth = radio_height;//最後に検出したheightを格納
    radio15_height_log++;//キー用のカウント
    radio.style.fontSize = last_heigth-10 + "px";//heightの単位もpxなのでそのまま代入でいい（余白分10px）
}
}, 10);

//ラジオ1-6
var radio16_height_log = 0;//履歴用
var radio16_font = 22; //初期値固定フォントサイズ（可変）
setInterval(() => {
if(document.getElementById('radio1_6')){
    // alert("ok");//ok
    const radio = document.getElementById('radio1_6');
    const rect = radio.getBoundingClientRect(); // 要素の座標を取得
    //要素の座標を格納
    const radio_height = rect.bottom - rect.top;
    var last_heigth = radio_height;//最後に検出したheightを格納
    radio16_height_log++;//キー用のカウント
    radio.style.fontSize = last_heigth-10 + "px";//heightの単位もpxなのでそのまま代入でいい（余白分10px）
}
}, 10);

//ラジオ1-7
var radio17_height_log = 0;//履歴用
var radio17_font = 22; //初期値固定フォントサイズ（可変）
setInterval(() => {
if(document.getElementById('radio1_7')){
    // alert("ok");//ok
    const radio = document.getElementById('radio1_7');
    const rect = radio.getBoundingClientRect(); // 要素の座標を取得
    //要素の座標を格納
    const radio_height = rect.bottom - rect.top;
    var last_heigth = radio_height;//最後に検出したheightを格納
    radio17_height_log++;//キー用のカウント
    radio.style.fontSize = last_heigth-10 + "px";//heightの単位もpxなのでそのまま代入でいい（余白分10px）
}
}, 10);

//ラジオ1-8
var radio18_height_log = 0;//履歴用
var radio18_font = 22; //初期値固定フォントサイズ（可変）
setInterval(() => {
if(document.getElementById('radio1_8')){
    // alert("ok");//ok
    const radio = document.getElementById('radio1_8');
    const rect = radio.getBoundingClientRect(); // 要素の座標を取得
    //要素の座標を格納
    const radio_height = rect.bottom - rect.top;
    var last_heigth = radio_height;//最後に検出したheightを格納
    radio18_height_log++;//キー用のカウント
    radio.style.fontSize = last_heigth-10 + "px";//heightの単位もpxなのでそのまま代入でいい（余白分10px）
}
}, 10);

//ラジオ2-1
var radio21_height_log = 0;//履歴用
var radio21_font = 22; //初期値固定フォントサイズ（可変）
setInterval(() => {
if(document.getElementById('radio2_1')){
    // alert("ok");//ok
    const radio = document.getElementById('radio2_1');
    const rect = radio.getBoundingClientRect(); // 要素の座標を取得
    //要素の座標を格納
    const radio_height = rect.bottom - rect.top;
    var last_heigth = radio_height;//最後に検出したheightを格納
    radio21_height_log++;//キー用のカウント
    radio.style.fontSize = last_heigth-10 + "px";//heightの単位もpxなのでそのまま代入でいい（余白分10px）
}
}, 10);

//ラジオ2-2
var radio22_height_log = 0;//履歴用
var radio22_font = 22; //初期値固定フォントサイズ（可変）
setInterval(() => {
if(document.getElementById('radio2_2')){
    // alert("ok");//ok
    const radio = document.getElementById('radio2_2');
    const rect = radio.getBoundingClientRect(); // 要素の座標を取得
    //要素の座標を格納
    const radio_height = rect.bottom - rect.top;
    var last_heigth = radio_height;//最後に検出したheightを格納
    radio22_height_log++;//キー用のカウント
    radio.style.fontSize = last_heigth-10 + "px";//heightの単位もpxなのでそのまま代入でいい（余白分10px）
}
}, 10);

//ラジオ2-3
var radio23_height_log = 0;//履歴用
var radio23_font = 22; //初期値固定フォントサイズ（可変）
setInterval(() => {
if(document.getElementById('radio2_3')){
    // alert("ok");//ok
    const radio = document.getElementById('radio2_3');
    const rect = radio.getBoundingClientRect(); // 要素の座標を取得
    //要素の座標を格納
    const radio_height = rect.bottom - rect.top;
    var last_heigth = radio_height;//最後に検出したheightを格納
    radio23_height_log++;//キー用のカウント
    radio.style.fontSize = last_heigth-10 + "px";//heightの単位もpxなのでそのまま代入でいい（余白分10px）
}
}, 10);

//ラジオ2-4
var radio24_height_log = 0;//履歴用
var radio24_font = 22; //初期値固定フォントサイズ（可変）
setInterval(() => {
if(document.getElementById('radio2_4')){
    // alert("ok");//ok
    const radio = document.getElementById('radio2_4');
    const rect = radio.getBoundingClientRect(); // 要素の座標を取得
    //要素の座標を格納
    const radio_height = rect.bottom - rect.top;
    var last_heigth = radio_height;//最後に検出したheightを格納
    radio24_height_log++;//キー用のカウント
    radio.style.fontSize = last_heigth-10 + "px";//heightの単位もpxなのでそのまま代入でいい（余白分10px）
}
}, 10);

//ラジオ2-5
var radio25_height_log = 0;//履歴用
var radio25_font = 22; //初期値固定フォントサイズ（可変）
setInterval(() => {
if(document.getElementById('radio2_5')){
    // alert("ok");//ok
    const radio = document.getElementById('radio2_5');
    const rect = radio.getBoundingClientRect(); // 要素の座標を取得
    //要素の座標を格納
    const radio_height = rect.bottom - rect.top;
    var last_heigth = radio_height;//最後に検出したheightを格納
    radio25_height_log++;//キー用のカウント
    radio.style.fontSize = last_heigth-10 + "px";//heightの単位もpxなのでそのまま代入でいい（余白分10px）
}
}, 10);

//ラジオ2-6
var radio26_height_log = 0;//履歴用
var radio26_font = 22; //初期値固定フォントサイズ（可変）
setInterval(() => {
if(document.getElementById('radio2_6')){
    // alert("ok");//ok
    const radio = document.getElementById('radio2_6');
    const rect = radio.getBoundingClientRect(); // 要素の座標を取得
    //要素の座標を格納
    const radio_height = rect.bottom - rect.top;
    var last_heigth = radio_height;//最後に検出したheightを格納
    radio26_height_log++;//キー用のカウント
    radio.style.fontSize = last_heigth-10 + "px";//heightの単位もpxなのでそのまま代入でいい（余白分10px）
}
}, 10);

//ラジオ2-7
var radio27_height_log = 0;//履歴用
var radio27_font = 22; //初期値固定フォントサイズ（可変）
setInterval(() => {
if(document.getElementById('radio2_7')){
    // alert("ok");//ok
    const radio = document.getElementById('radio2_7');
    const rect = radio.getBoundingClientRect(); // 要素の座標を取得
    //要素の座標を格納
    const radio_height = rect.bottom - rect.top;
    var last_heigth = radio_height;//最後に検出したheightを格納
    radio27_height_log++;//キー用のカウント
    radio.style.fontSize = last_heigth-10 + "px";//heightの単位もpxなのでそのまま代入でいい（余白分10px）
}
}, 10);

//ラジオ2-8
var radio28_height_log = 0;//履歴用
var radio28_font = 22; //初期値固定フォントサイズ（可変）
setInterval(() => {
if(document.getElementById('radio2_8')){
    // alert("ok");//ok
    const radio = document.getElementById('radio2_8');
    const rect = radio.getBoundingClientRect(); // 要素の座標を取得
    //要素の座標を格納
    const radio_height = rect.bottom - rect.top;
    var last_heigth = radio_height;//最後に検出したheightを格納
    radio28_height_log++;//キー用のカウント
    radio.style.fontSize = last_heigth-10 + "px";//heightの単位もpxなのでそのまま代入でいい（余白分10px）
}
}, 10);

//ラジオ3-1
var radio31_height_log = 0;//履歴用
var radio31_font = 22; //初期値固定フォントサイズ（可変）
setInterval(() => {
if(document.getElementById('radio3_1')){
    // alert("ok");//ok
    const radio = document.getElementById('radio3_1');
    const rect = radio.getBoundingClientRect(); // 要素の座標を取得
    //要素の座標を格納
    const radio_height = rect.bottom - rect.top;
    var last_heigth = radio_height;//最後に検出したheightを格納
    radio31_height_log++;//キー用のカウント
    radio.style.fontSize = last_heigth-10 + "px";//heightの単位もpxなのでそのまま代入でいい（余白分10px）
}
}, 10);

//ラジオ3-2
var radio32_height_log = 0;//履歴用
var radio32_font = 22; //初期値固定フォントサイズ（可変）
setInterval(() => {
if(document.getElementById('radio3_2')){
    // alert("ok");//ok
    const radio = document.getElementById('radio3_2');
    const rect = radio.getBoundingClientRect(); // 要素の座標を取得
    //要素の座標を格納
    const radio_height = rect.bottom - rect.top;
    var last_heigth = radio_height;//最後に検出したheightを格納
    radio32_height_log++;//キー用のカウント
    radio.style.fontSize = last_heigth-10 + "px";//heightの単位もpxなのでそのまま代入でいい（余白分10px）
}
}, 10);

//ラジオ3-3
var radio33_height_log = 0;//履歴用
var radio33_font = 22; //初期値固定フォントサイズ（可変）
setInterval(() => {
if(document.getElementById('radio3_3')){
    // alert("ok");//ok
    const radio = document.getElementById('radio3_3');
    const rect = radio.getBoundingClientRect(); // 要素の座標を取得
    //要素の座標を格納
    const radio_height = rect.bottom - rect.top;
    var last_heigth = radio_height;//最後に検出したheightを格納
    radio33_height_log++;//キー用のカウント
    radio.style.fontSize = last_heigth-10 + "px";//heightの単位もpxなのでそのまま代入でいい（余白分10px）
}
}, 10);

//ラジオ3-4
var radio34_height_log = 0;//履歴用
var radio34_font = 22; //初期値固定フォントサイズ（可変）
setInterval(() => {
if(document.getElementById('radio3_4')){
    // alert("ok");//ok
    const radio = document.getElementById('radio3_4');
    const rect = radio.getBoundingClientRect(); // 要素の座標を取得
    //要素の座標を格納
    const radio_height = rect.bottom - rect.top;
    var last_heigth = radio_height;//最後に検出したheightを格納
    radio34_height_log++;//キー用のカウント
    radio.style.fontSize = last_heigth-10 + "px";//heightの単位もpxなのでそのまま代入でいい（余白分10px）
}
}, 10);

//ラジオ3-5
var radio35_height_log = 0;//履歴用
var radio35_font = 22; //初期値固定フォントサイズ（可変）
setInterval(() => {
if(document.getElementById('radio3_5')){
    // alert("ok");//ok
    const radio = document.getElementById('radio3_5');
    const rect = radio.getBoundingClientRect(); // 要素の座標を取得
    //要素の座標を格納
    const radio_height = rect.bottom - rect.top;
    var last_heigth = radio_height;//最後に検出したheightを格納
    radio35_height_log++;//キー用のカウント
    radio.style.fontSize = last_heigth-10 + "px";//heightの単位もpxなのでそのまま代入でいい（余白分10px）
}
}, 10);

//ラジオ3-6
var radio36_height_log = 0;//履歴用
var radio36_font = 22; //初期値固定フォントサイズ（可変）
setInterval(() => {
if(document.getElementById('radio3_6')){
    // alert("ok");//ok
    const radio = document.getElementById('radio3_6');
    const rect = radio.getBoundingClientRect(); // 要素の座標を取得
    //要素の座標を格納
    const radio_height = rect.bottom - rect.top;
    var last_heigth = radio_height;//最後に検出したheightを格納
    radio36_height_log++;//キー用のカウント
    radio.style.fontSize = last_heigth-10 + "px";//heightの単位もpxなのでそのまま代入でいい（余白分10px）
}
}, 10);

//ラジオ3-7
var radio37_height_log = 0;//履歴用
var radio37_font = 22; //初期値固定フォントサイズ（可変）
setInterval(() => {
if(document.getElementById('radio3_7')){
    // alert("ok");//ok
    const radio = document.getElementById('radio3_7');
    const rect = radio.getBoundingClientRect(); // 要素の座標を取得
    //要素の座標を格納
    const radio_height = rect.bottom - rect.top;
    var last_heigth = radio_height;//最後に検出したheightを格納
    radio37_height_log++;//キー用のカウント
    radio.style.fontSize = last_heigth-10 + "px";//heightの単位もpxなのでそのまま代入でいい（余白分10px）
}
}, 10);

//ラジオ3-8
var radio38_height_log = 0;//履歴用
var radio38_font = 22; //初期値固定フォントサイズ（可変）
setInterval(() => {
if(document.getElementById('radio3_8')){
    // alert("ok");//ok
    const radio = document.getElementById('radio3_8');
    const rect = radio.getBoundingClientRect(); // 要素の座標を取得
    //要素の座標を格納
    const radio_height = rect.bottom - rect.top;
    var last_heigth = radio_height;//最後に検出したheightを格納
    radio38_height_log++;//キー用のカウント
    radio.style.fontSize = last_heigth-10 + "px";//heightの単位もpxなのでそのまま代入でいい（余白分10px）
}
}, 10);

//ラジオ4-1
var radio41_height_log = 0;//履歴用
var radio41_font = 22; //初期値固定フォントサイズ（可変）
setInterval(() => {
if(document.getElementById('radio4_1')){
    // alert("ok");//ok
    const radio = document.getElementById('radio4_1');
    const rect = radio.getBoundingClientRect(); // 要素の座標を取得
    //要素の座標を格納
    const radio_height = rect.bottom - rect.top;
    var last_heigth = radio_height;//最後に検出したheightを格納
    radio41_height_log++;//キー用のカウント
    radio.style.fontSize = last_heigth-10 + "px";//heightの単位もpxなのでそのまま代入でいい（余白分10px）
}
}, 10);

//ラジオ4-2
var radio42_height_log = 0;//履歴用
var radio42_font = 22; //初期値固定フォントサイズ（可変）
setInterval(() => {
if(document.getElementById('radio4_2')){
    // alert("ok");//ok
    const radio = document.getElementById('radio4_2');
    const rect = radio.getBoundingClientRect(); // 要素の座標を取得
    //要素の座標を格納
    const radio_height = rect.bottom - rect.top;
    var last_heigth = radio_height;//最後に検出したheightを格納
    radio42_height_log++;//キー用のカウント
    radio.style.fontSize = last_heigth-10 + "px";//heightの単位もpxなのでそのまま代入でいい（余白分10px）
}
}, 10);

//ラジオ4-3
var radio43_height_log = 0;//履歴用
var radio43_font = 22; //初期値固定フォントサイズ（可変）
setInterval(() => {
if(document.getElementById('radio4_3')){
    // alert("ok");//ok
    const radio = document.getElementById('radio4_3');
    const rect = radio.getBoundingClientRect(); // 要素の座標を取得
    //要素の座標を格納
    const radio_height = rect.bottom - rect.top;
    var last_heigth = radio_height;//最後に検出したheightを格納
    radio43_height_log++;//キー用のカウント
    radio.style.fontSize = last_heigth-10 + "px";//heightの単位もpxなのでそのまま代入でいい（余白分10px）
}
}, 10);

//ラジオ4-4
var radio44_height_log = 0;//履歴用
var radio44_font = 22; //初期値固定フォントサイズ（可変）
setInterval(() => {
if(document.getElementById('radio4_4')){
    // alert("ok");//ok
    const radio = document.getElementById('radio4_4');
    const rect = radio.getBoundingClientRect(); // 要素の座標を取得
    //要素の座標を格納
    const radio_height = rect.bottom - rect.top;
    var last_heigth = radio_height;//最後に検出したheightを格納
    radio44_height_log++;//キー用のカウント
    radio.style.fontSize = last_heigth-10 + "px";//heightの単位もpxなのでそのまま代入でいい（余白分10px）
}
}, 10);

//ラジオ4-5
var radio45_height_log = 0;//履歴用
var radio45_font = 22; //初期値固定フォントサイズ（可変）
setInterval(() => {
if(document.getElementById('radio4_5')){
    // alert("ok");//ok
    const radio = document.getElementById('radio4_5');
    const rect = radio.getBoundingClientRect(); // 要素の座標を取得
    //要素の座標を格納
    const radio_height = rect.bottom - rect.top;
    var last_heigth = radio_height;//最後に検出したheightを格納
    radio45_height_log++;//キー用のカウント
    radio.style.fontSize = last_heigth-10 + "px";//heightの単位もpxなのでそのまま代入でいい（余白分10px）
}
}, 10);

//ラジオ4-6
var radio46_height_log = 0;//履歴用
var radio46_font = 22; //初期値固定フォントサイズ（可変）
setInterval(() => {
if(document.getElementById('radio4_6')){
    // alert("ok");//ok
    const radio = document.getElementById('radio4_6');
    const rect = radio.getBoundingClientRect(); // 要素の座標を取得
    //要素の座標を格納
    const radio_height = rect.bottom - rect.top;
    var last_heigth = radio_height;//最後に検出したheightを格納
    radio46_height_log++;//キー用のカウント
    radio.style.fontSize = last_heigth-10 + "px";//heightの単位もpxなのでそのまま代入でいい（余白分10px）
}
}, 10);

//ラジオ4-7
var radio47_height_log = 0;//履歴用
var radio47_font = 22; //初期値固定フォントサイズ（可変）
setInterval(() => {
if(document.getElementById('radio4_7')){
    // alert("ok");//ok
    const radio = document.getElementById('radio4_7');
    const rect = radio.getBoundingClientRect(); // 要素の座標を取得
    //要素の座標を格納
    const radio_height = rect.bottom - rect.top;
    var last_heigth = radio_height;//最後に検出したheightを格納
    radio47_height_log++;//キー用のカウント
    radio.style.fontSize = last_heigth-10 + "px";//heightの単位もpxなのでそのまま代入でいい（余白分10px）
}
}, 10);

//ラジオ4-8
var radio48_height_log = 0;//履歴用
var radio48_font = 22; //初期値固定フォントサイズ（可変）
setInterval(() => {
if(document.getElementById('radio4_8')){
    // alert("ok");//ok
    const radio = document.getElementById('radio4_8');
    const rect = radio.getBoundingClientRect(); // 要素の座標を取得
    //要素の座標を格納
    const radio_height = rect.bottom - rect.top;
    var last_heigth = radio_height;//最後に検出したheightを格納
    radio48_height_log++;//キー用のカウント
    radio.style.fontSize = last_heigth-10 + "px";//heightの単位もpxなのでそのまま代入でいい（余白分10px）
}
}, 10);

//動的移動系******************************************（コマンドボタン）**********************************************************************************

//コマンド1*********************************************

var judge_command1 = "false"; //マウス座標が要素内にあれば"true"
var move_command1 = "false"; //judge_command1がtrueのときに要素をクリックしたら"true"
document.addEventListener('mousemove', function(event){
    // マウスの座標を取得
    const x = event.clientX;
    const y = event.clientY;
    if(document.getElementById('command1')){//id=command1が存在するとき
        const command1 = document.getElementById('command1');
        const rect = command1.getBoundingClientRect(); // 要素の座標を取得
        //要素の座標を格納
        const command_x_left = rect.left;//左
        const command_x_right = rect.right-25;//右 ※ズームボタン考慮
        const command_y_top = rect.top;//上
        const command_y_bottom = rect.bottom;//下 ※ボトム
        const command_width = (rect.right - rect.left)/2; //要素の横幅の半分
        const command_height = (rect.bottom - rect.top)/2; //要素の縦幅の半分　※これで中心に来る
        if(x >= command_x_left && x <= command_x_right && y <= command_y_bottom && y >= command_y_top){//マウス座標が要素内にあれば
            judge_command1="true";
            command1.addEventListener('click',function(){
                move_command1 = "true";//ok
                command1.classList.add('command_move');
            });
            document.addEventListener('mousemove',function(){
                if(move_command1 == "true"){
                    command1.style.left = x-command_width+`px`;
                    command1.style.top = y-command_height+`px`;
                    command1.addEventListener('click',function(){
                        move_command1 = "false";//ok
                        command1.classList.remove('command_move');
                    });
                }
            });
        }else{
            judge_command1="false";//ok
        }
    }
});

//コマンド2*********************************************

var judge_command2 = "false"; //マウス座標が要素内にあれば"true"
var move_command2 = "false"; //judge_command2がtrueのときに要素をクリックしたら"true"
document.addEventListener('mousemove', function(event){
    // マウスの座標を取得
    const x = event.clientX;
    const y = event.clientY;
    if(document.getElementById('command2')){//id=command2が存在するとき
        const command2 = document.getElementById('command2');
        const rect = command2.getBoundingClientRect(); // 要素の座標を取得
        //要素の座標を格納
        const command_x_left = rect.left;//左
        const command_x_right = rect.right-25;//右 ※ズームボタン考慮
        const command_y_top = rect.top;//上
        const command_y_bottom = rect.bottom;//下 ※ボトム
        const command_width = (rect.right - rect.left)/2; //要素の横幅の半分
        const command_height = (rect.bottom - rect.top)/2; //要素の縦幅の半分　※これで中心に来る
        if(x >= command_x_left && x <= command_x_right && y <= command_y_bottom && y >= command_y_top){//マウス座標が要素内にあれば
            judge_command2="true";
            command2.addEventListener('click',function(){
                move_command2 = "true";//ok
                command2.classList.add('command_move');
            });
            document.addEventListener('mousemove',function(){
                if(move_command2 == "true"){
                    command2.style.left = x-command_width+`px`;
                    command2.style.top = y-command_height+`px`;
                    command2.addEventListener('click',function(){
                        move_command2 = "false";//ok
                        command2.classList.remove('command_move');
                    });
                }
            });
        }else{
            judge_command2="false";//ok
        }
    }
});

//コマンド3*********************************************

var judge_command3 = "false"; //マウス座標が要素内にあれば"true"
var move_command3 = "false"; //judge_command3がtrueのときに要素をクリックしたら"true"
document.addEventListener('mousemove', function(event){
// マウスの座標を取得
const x = event.clientX;
const y = event.clientY;
if(document.getElementById('command3')){//id=command3が存在するとき
    const command3 = document.getElementById('command3');
    const rect = command3.getBoundingClientRect(); // 要素の座標を取得
    //要素の座標を格納
    const command_x_left = rect.left;//左
    const command_x_right = rect.right-25;//右 ※ズームボタン考慮
    const command_y_top = rect.top;//上
    const command_y_bottom = rect.bottom;//下 ※ボトム
    const command_width = (rect.right - rect.left)/2; //要素の横幅の半分
    const command_height = (rect.bottom - rect.top)/2; //要素の縦幅の半分　※これで中心に来る
    if(x >= command_x_left && x <= command_x_right && y <= command_y_bottom && y >= command_y_top){//マウス座標が要素内にあれば
        judge_command3="true";
        command3.addEventListener('click',function(){
            move_command3 = "true";//ok
            command3.classList.add('command_move');
        });
        document.addEventListener('mousemove',function(){
            if(move_command3 == "true"){
                command3.style.left = x-command_width+`px`;
                command3.style.top = y-command_height+`px`;
                command3.addEventListener('click',function(){
                    move_command3 = "false";//ok
                    command3.classList.remove('command_move');
                });
            }
        });
    }else{
        judge_command3="false";//ok
    }
}
});

//コマンド4*********************************************

var judge_command4 = "false"; //マウス座標が要素内にあれば"true"
var move_command4 = "false"; //judge_command4がtrueのときに要素をクリックしたら"true"
document.addEventListener('mousemove', function(event){
// マウスの座標を取得
const x = event.clientX;
const y = event.clientY;
if(document.getElementById('command4')){//id=command4が存在するとき
    const command4 = document.getElementById('command4');
    const rect = command4.getBoundingClientRect(); // 要素の座標を取得
    //要素の座標を格納
    const command_x_left = rect.left;//左
    const command_x_right = rect.right-25;//右 ※ズームボタン考慮
    const command_y_top = rect.top;//上
    const command_y_bottom = rect.bottom;//下 ※ボトム
    const command_width = (rect.right - rect.left)/2; //要素の横幅の半分
    const command_height = (rect.bottom - rect.top)/2; //要素の縦幅の半分　※これで中心に来る
    if(x >= command_x_left && x <= command_x_right && y <= command_y_bottom && y >= command_y_top){//マウス座標が要素内にあれば
        judge_command4="true";
        command4.addEventListener('click',function(){
            move_command4 = "true";//ok
            command4.classList.add('command_move');
        });
        document.addEventListener('mousemove',function(){
            if(move_command4 == "true"){
                command4.style.left = x-command_width+`px`;
                command4.style.top = y-command_height+`px`;
                command4.addEventListener('click',function(){
                    move_command4 = "false";//ok
                    command4.classList.remove('command_move');
                });
            }
        });
    }else{
        judge_command4="false";//ok
    }
}
});

//コマンド5*********************************************

var judge_command5 = "false"; //マウス座標が要素内にあれば"true"
var move_command5 = "false"; //judge_command5がtrueのときに要素をクリックしたら"true"
document.addEventListener('mousemove', function(event){
// マウスの座標を取得
const x = event.clientX;
const y = event.clientY;
if(document.getElementById('command5')){//id=command5が存在するとき
    const command5 = document.getElementById('command5');
    const rect = command5.getBoundingClientRect(); // 要素の座標を取得
    //要素の座標を格納
    const command_x_left = rect.left;//左
    const command_x_right = rect.right-25;//右 ※ズームボタン考慮
    const command_y_top = rect.top;//上
    const command_y_bottom = rect.bottom;//下 ※ボトム
    const command_width = (rect.right - rect.left)/2; //要素の横幅の半分
    const command_height = (rect.bottom - rect.top)/2; //要素の縦幅の半分　※これで中心に来る
    if(x >= command_x_left && x <= command_x_right && y <= command_y_bottom && y >= command_y_top){//マウス座標が要素内にあれば
        judge_command5="true";
        command5.addEventListener('click',function(){
            move_command5 = "true";//ok
            command5.classList.add('command_move');
        });
        document.addEventListener('mousemove',function(){
            if(move_command5 == "true"){
                command5.style.left = x-command_width+`px`;
                command5.style.top = y-command_height+`px`;
                command5.addEventListener('click',function(){
                    move_command5 = "false";//ok
                    command5.classList.remove('command_move');
                });
            }
        });
    }else{
        judge_command5="false";//ok
    }
}
});

//コマンド6*********************************************

var judge_command6 = "false"; //マウス座標が要素内にあれば"true"
var move_command6 = "false"; //judge_command6がtrueのときに要素をクリックしたら"true"
document.addEventListener('mousemove', function(event){
// マウスの座標を取得
const x = event.clientX;
const y = event.clientY;
if(document.getElementById('command6')){//id=command6が存在するとき
    const command6 = document.getElementById('command6');
    const rect = command6.getBoundingClientRect(); // 要素の座標を取得
    //要素の座標を格納
    const command_x_left = rect.left;//左
    const command_x_right = rect.right-25;//右 ※ズームボタン考慮
    const command_y_top = rect.top;//上
    const command_y_bottom = rect.bottom;//下 ※ボトム
    const command_width = (rect.right - rect.left)/2; //要素の横幅の半分
    const command_height = (rect.bottom - rect.top)/2; //要素の縦幅の半分　※これで中心に来る
    if(x >= command_x_left && x <= command_x_right && y <= command_y_bottom && y >= command_y_top){//マウス座標が要素内にあれば
        judge_command6="true";
        command6.addEventListener('click',function(){
            move_command6 = "true";//ok
            command6.classList.add('command_move');
        });
        document.addEventListener('mousemove',function(){
            if(move_command6 == "true"){
                command6.style.left = x-command_width+`px`;
                command6.style.top = y-command_height+`px`;
                command6.addEventListener('click',function(){
                    move_command6 = "false";//ok
                    command6.classList.remove('command_move');
                });
            }
        });
    }else{
        judge_command6="false";//ok
    }
}
});

//コマンド7*********************************************

var judge_command7 = "false"; //マウス座標が要素内にあれば"true"
var move_command7 = "false"; //judge_command7がtrueのときに要素をクリックしたら"true"
document.addEventListener('mousemove', function(event){
// マウスの座標を取得
const x = event.clientX;
const y = event.clientY;
if(document.getElementById('command7')){//id=command7が存在するとき
    const command7 = document.getElementById('command7');
    const rect = command7.getBoundingClientRect(); // 要素の座標を取得
    //要素の座標を格納
    const command_x_left = rect.left;//左
    const command_x_right = rect.right-25;//右 ※ズームボタン考慮
    const command_y_top = rect.top;//上
    const command_y_bottom = rect.bottom;//下 ※ボトム
    const command_width = (rect.right - rect.left)/2; //要素の横幅の半分
    const command_height = (rect.bottom - rect.top)/2; //要素の縦幅の半分　※これで中心に来る
    if(x >= command_x_left && x <= command_x_right && y <= command_y_bottom && y >= command_y_top){//マウス座標が要素内にあれば
        judge_command7="true";
        command7.addEventListener('click',function(){
            move_command7 = "true";//ok
            command7.classList.add('command_move');
        });
        document.addEventListener('mousemove',function(){
            if(move_command7 == "true"){
                command7.style.left = x-command_width+`px`;
                command7.style.top = y-command_height+`px`;
                command7.addEventListener('click',function(){
                    move_command7 = "false";//ok
                    command7.classList.remove('command_move');
                });
            }
        });
    }else{
        judge_command7="false";//ok
    }
}
});

//コマンド8*********************************************

var judge_command8 = "false"; //マウス座標が要素内にあれば"true"
var move_command8 = "false"; //judge_command8がtrueのときに要素をクリックしたら"true"
document.addEventListener('mousemove', function(event){
// マウスの座標を取得
const x = event.clientX;
const y = event.clientY;
if(document.getElementById('command8')){//id=command8が存在するとき
    const command8 = document.getElementById('command8');
    const rect = command8.getBoundingClientRect(); // 要素の座標を取得
    //要素の座標を格納
    const command_x_left = rect.left;//左
    const command_x_right = rect.right-25;//右 ※ズームボタン考慮
    const command_y_top = rect.top;//上
    const command_y_bottom = rect.bottom;//下 ※ボトム
    const command_width = (rect.right - rect.left)/2; //要素の横幅の半分
    const command_height = (rect.bottom - rect.top)/2; //要素の縦幅の半分　※これで中心に来る
    if(x >= command_x_left && x <= command_x_right && y <= command_y_bottom && y >= command_y_top){//マウス座標が要素内にあれば
        judge_command8="true";
        command8.addEventListener('click',function(){
            move_command8 = "true";//ok
            command8.classList.add('command_move');
        });
        document.addEventListener('mousemove',function(){
            if(move_command8 == "true"){
                command8.style.left = x-command_width+`px`;
                command8.style.top = y-command_height+`px`;
                command8.addEventListener('click',function(){
                    move_command8 = "false";//ok
                    command8.classList.remove('command_move');
                });
            }
        });
    }else{
        judge_command8="false";//ok
    }
}
});

//コマンド9*********************************************

var judge_command9 = "false"; //マウス座標が要素内にあれば"true"
var move_command9 = "false"; //judge_command9がtrueのときに要素をクリックしたら"true"
document.addEventListener('mousemove', function(event){
// マウスの座標を取得
const x = event.clientX;
const y = event.clientY;
if(document.getElementById('command9')){//id=command9が存在するとき
    const command9 = document.getElementById('command9');
    const rect = command9.getBoundingClientRect(); // 要素の座標を取得
    //要素の座標を格納
    const command_x_left = rect.left;//左
    const command_x_right = rect.right-25;//右 ※ズームボタン考慮
    const command_y_top = rect.top;//上
    const command_y_bottom = rect.bottom;//下 ※ボトム
    const command_width = (rect.right - rect.left)/2; //要素の横幅の半分
    const command_height = (rect.bottom - rect.top)/2; //要素の縦幅の半分　※これで中心に来る
    if(x >= command_x_left && x <= command_x_right && y <= command_y_bottom && y >= command_y_top){//マウス座標が要素内にあれば
        judge_command9="true";
        command9.addEventListener('click',function(){
            move_command9 = "true";//ok
            command9.classList.add('command_move');
        });
        document.addEventListener('mousemove',function(){
            if(move_command9 == "true"){
                command9.style.left = x-command_width+`px`;
                command9.style.top = y-command_height+`px`;
                command9.addEventListener('click',function(){
                    move_command9 = "false";//ok
                    command9.classList.remove('command_move');
                });
            }
        });
    }else{
        judge_command9="false";//ok
    }
}
});

//コマンド10*********************************************

var judge_command10 = "false"; //マウス座標が要素内にあれば"true"
var move_command10 = "false"; //judge_command10がtrueのときに要素をクリックしたら"true"
document.addEventListener('mousemove', function(event){
// マウスの座標を取得
const x = event.clientX;
const y = event.clientY;
if(document.getElementById('command10')){//id=command10が存在するとき
    const command10 = document.getElementById('command10');
    const rect = command10.getBoundingClientRect(); // 要素の座標を取得
    //要素の座標を格納
    const command_x_left = rect.left;//左
    const command_x_right = rect.right-25;//右 ※ズームボタン考慮
    const command_y_top = rect.top;//上
    const command_y_bottom = rect.bottom;//下 ※ボトム
    const command_width = (rect.right - rect.left)/2; //要素の横幅の半分
    const command_height = (rect.bottom - rect.top)/2; //要素の縦幅の半分　※これで中心に来る
    if(x >= command_x_left && x <= command_x_right && y <= command_y_bottom && y >= command_y_top){//マウス座標が要素内にあれば
        judge_command10="true";
        command10.addEventListener('click',function(){
            move_command10 = "true";//ok
            command10.classList.add('command_move');
        });
        document.addEventListener('mousemove',function(){
            if(move_command10 == "true"){
                command10.style.left = x-command_width+`px`;
                command10.style.top = y-command_height+`px`;
                command10.addEventListener('click',function(){
                    move_command10 = "false";//ok
                    command10.classList.remove('command_move');
                });
            }
        });
    }else{
        judge_command10="false";//ok
    }
}
});

//*******フォントサイズ動的変更******************************************（コマンド）**********************************************************************************

//コマンド1用
var command1_height_log = 0;//履歴用
var command1_font = 22; //初期値固定フォントサイズ（可変）
setInterval(() => {
if(document.getElementById('command1')){
    // alert("ok");//ok
    const command = document.getElementById('command1');
    const rect = command.getBoundingClientRect(); // 要素の座標を取得
    //要素の座標を格納
    const command_height = rect.bottom - rect.top;
    var last_heigth = command_height;//最後に検出したheightを格納
    command1_height_log++;//キー用のカウント
    command.style.fontSize = last_heigth-10 + "px";//heightの単位もpxなのでそのまま代入でいい（余白分10px）
}
}, 10);

//コマンド2用
var command2_height_log = 0;//履歴用
var command2_font = 22; //初期値固定フォントサイズ（可変）
setInterval(() => {
if(document.getElementById('command2')){
    // alert("ok");//ok
    const command = document.getElementById('command2');
    const rect = command.getBoundingClientRect(); // 要素の座標を取得
    //要素の座標を格納
    const command_height = rect.bottom - rect.top;
    var last_heigth = command_height;//最後に検出したheightを格納
    command2_height_log++;//キー用のカウント
    command.style.fontSize = last_heigth-10 + "px";//heightの単位もpxなのでそのまま代入でいい（余白分10px）
}
}, 10);

//コマンド3用
var command3_height_log = 0;//履歴用
var command3_font = 22; //初期値固定フォントサイズ（可変）
setInterval(() => {
if(document.getElementById('command3')){
    // alert("ok");//ok
    const command = document.getElementById('command3');
    const rect = command.getBoundingClientRect(); // 要素の座標を取得
    //要素の座標を格納
    const command_height = rect.bottom - rect.top;
    var last_heigth = command_height;//最後に検出したheightを格納
    command3_height_log++;//キー用のカウント
    command.style.fontSize = last_heigth-10 + "px";//heightの単位もpxなのでそのまま代入でいい（余白分10px）
}
}, 10);

//コマンド4用
var command4_height_log = 0;//履歴用
var command4_font = 22; //初期値固定フォントサイズ（可変）
setInterval(() => {
if(document.getElementById('command4')){
    // alert("ok");//ok
    const command = document.getElementById('command4');
    const rect = command.getBoundingClientRect(); // 要素の座標を取得
    //要素の座標を格納
    const command_height = rect.bottom - rect.top;
    var last_heigth = command_height;//最後に検出したheightを格納
    command4_height_log++;//キー用のカウント
    command.style.fontSize = last_heigth-10 + "px";//heightの単位もpxなのでそのまま代入でいい（余白分10px）
}
}, 10);

//コマンド5用
var command5_height_log = 0;//履歴用
var command5_font = 22; //初期値固定フォントサイズ（可変）
setInterval(() => {
if(document.getElementById('command5')){
    // alert("ok");//ok
    const command = document.getElementById('command5');
    const rect = command.getBoundingClientRect(); // 要素の座標を取得
    //要素の座標を格納
    const command_height = rect.bottom - rect.top;
    var last_heigth = command_height;//最後に検出したheightを格納
    command5_height_log++;//キー用のカウント
    command.style.fontSize = last_heigth-10 + "px";//heightの単位もpxなのでそのまま代入でいい（余白分10px）
}
}, 10);

//コマンド6用
var command6_height_log = 0;//履歴用
var command6_font = 22; //初期値固定フォントサイズ（可変）
setInterval(() => {
if(document.getElementById('command6')){
    // alert("ok");//ok
    const command = document.getElementById('command6');
    const rect = command.getBoundingClientRect(); // 要素の座標を取得
    //要素の座標を格納
    const command_height = rect.bottom - rect.top;
    var last_heigth = command_height;//最後に検出したheightを格納
    command6_height_log++;//キー用のカウント
    command.style.fontSize = last_heigth-10 + "px";//heightの単位もpxなのでそのまま代入でいい（余白分10px）
}
}, 10);

//コマンド7用
var command7_height_log = 0;//履歴用
var command7_font = 22; //初期値固定フォントサイズ（可変）
setInterval(() => {
if(document.getElementById('command7')){
    // alert("ok");//ok
    const command = document.getElementById('command7');
    const rect = command.getBoundingClientRect(); // 要素の座標を取得
    //要素の座標を格納
    const command_height = rect.bottom - rect.top;
    var last_heigth = command_height;//最後に検出したheightを格納
    command7_height_log++;//キー用のカウント
    command.style.fontSize = last_heigth-10 + "px";//heightの単位もpxなのでそのまま代入でいい（余白分10px）
}
}, 10);

//コマンド8用
var command8_height_log = 0;//履歴用
var command8_font = 22; //初期値固定フォントサイズ（可変）
setInterval(() => {
if(document.getElementById('command8')){
    // alert("ok");//ok
    const command = document.getElementById('command8');
    const rect = command.getBoundingClientRect(); // 要素の座標を取得
    //要素の座標を格納
    const command_height = rect.bottom - rect.top;
    var last_heigth = command_height;//最後に検出したheightを格納
    command8_height_log++;//キー用のカウント
    command.style.fontSize = last_heigth-10 + "px";//heightの単位もpxなのでそのまま代入でいい（余白分10px）
}
}, 10);

//コマンド9用
var command9_height_log = 0;//履歴用
var command9_font = 22; //初期値固定フォントサイズ（可変）
setInterval(() => {
if(document.getElementById('command9')){
    // alert("ok");//ok
    const command = document.getElementById('command9');
    const rect = command.getBoundingClientRect(); // 要素の座標を取得
    //要素の座標を格納
    const command_height = rect.bottom - rect.top;
    var last_heigth = command_height;//最後に検出したheightを格納
    command9_height_log++;//キー用のカウント
    command.style.fontSize = last_heigth-10 + "px";//heightの単位もpxなのでそのまま代入でいい（余白分10px）
}
}, 10);

//コマンド10用
var command10_height_log = 0;//履歴用
var command10_font = 22; //初期値固定フォントサイズ（可変）
setInterval(() => {
if(document.getElementById('command10')){
    // alert("ok");//ok
    const command = document.getElementById('command10');
    const rect = command.getBoundingClientRect(); // 要素の座標を取得
    //要素の座標を格納
    const command_height = rect.bottom - rect.top;
    var last_heigth = command_height;//最後に検出したheightを格納
    command10_height_log++;//キー用のカウント
    command.style.fontSize = last_heigth-10 + "px";//heightの単位もpxなのでそのまま代入でいい（余白分10px）
}
}, 10);

//動的移動系******************************************move button**********************************************************************************

//1*********************************************

var judge_move_button1 = "false"; //マウス座標が要素内にあれば"true"
var move_move_button1 = "false"; //judge_move_button1がtrueのときに要素をクリックしたら"true"
document.addEventListener('mousemove', function(event){
    // マウスの座標を取得
    const x = event.clientX;
    const y = event.clientY;
    if(document.getElementById('move_button1')){//id=move_button1が存在するとき
        const move_button1 = document.getElementById('move_button1');
        const rect = move_button1.getBoundingClientRect(); // 要素の座標を取得
        //要素の座標を格納
        const move_button_x_left = rect.left;//左
        const move_button_x_right = rect.right;//右 ※ズームボタン考慮
        const move_button_y_top = rect.top;//上
        const move_button_y_bottom = rect.bottom;//下 ※ボトム
        const move_button_width = (rect.right - rect.left)/2; //要素の横幅の半分
        const move_button_height = (rect.bottom - rect.top)/2; //要素の縦幅の半分　※これで中心に来る
        if(x >= move_button_x_left && x <= move_button_x_right && y <= move_button_y_bottom && y >= move_button_y_top){//マウス座標が要素内にあれば
            judge_move_button1="true";
            move_button1.addEventListener('click',function(){
                move_move_button1 = "true";//ok
                move_button1.classList.add('move_button_move');
            });
            document.addEventListener('mousemove',function(){
                if(move_move_button1 == "true"){
                    move_button1.style.left = x-move_button_width+`px`;
                    move_button1.style.top = y-move_button_height+`px`;
                    move_button1.addEventListener('click',function(){
                        move_move_button1 = "false";//ok
                        move_button1.classList.remove('move_button_move');
                    });
                }
            });
        }else{
            judge_move_button1="false";//ok
        }
    }
});

//2*********************************************

var judge_move_button2 = "false"; //マウス座標が要素内にあれば"true"
var move_move_button2 = "false"; //judge_move_button2がtrueのときに要素をクリックしたら"true"
document.addEventListener('mousemove', function(event){
    // マウスの座標を取得
    const x = event.clientX;
    const y = event.clientY;
    if(document.getElementById('move_button2')){//id=move_button2が存在するとき
        const move_button2 = document.getElementById('move_button2');
        const rect = move_button2.getBoundingClientRect(); // 要素の座標を取得
        //要素の座標を格納
        const move_button_x_left = rect.left;//左
        const move_button_x_right = rect.right;//右 ※ズームボタン考慮
        const move_button_y_top = rect.top;//上
        const move_button_y_bottom = rect.bottom;//下 ※ボトム
        const move_button_width = (rect.right - rect.left)/2; //要素の横幅の半分
        const move_button_height = (rect.bottom - rect.top)/2; //要素の縦幅の半分　※これで中心に来る
        if(x >= move_button_x_left && x <= move_button_x_right && y <= move_button_y_bottom && y >= move_button_y_top){//マウス座標が要素内にあれば
            judge_move_button2="true";
            move_button2.addEventListener('click',function(){
                move_move_button2 = "true";//ok
                move_button2.classList.add('move_button_move');
            });
            document.addEventListener('mousemove',function(){
                if(move_move_button2 == "true"){
                    move_button2.style.left = x-move_button_width+`px`;
                    move_button2.style.top = y-move_button_height+`px`;
                    move_button2.addEventListener('click',function(){
                        move_move_button2 = "false";//ok
                        move_button2.classList.remove('move_button_move');
                    });
                }
            });
        }else{
            judge_move_button2="false";//ok
        }
    }
});

//移動ボタンの座標をth1に代入し続ける

//th1
setInterval(() => {
    if(document.getElementById('table1_th1')){
        var button = document.getElementById('move_button1');
        var th = document.getElementById('table1_th1');
        var rect = button.getBoundingClientRect();
        var left = rect.left;
        var top = rect.top;
        th.style.left = left + "px";
        th.style.top = (top+35) + "px";
    }
    }, 10);

//th2
setInterval(() => {
    if(document.getElementById('table1_th2')){
        var omae = document.getElementById('table1_th1');
        var ore = document.getElementById('table1_th2');
        var rect = omae.getBoundingClientRect();
        ore.style.left = (rect.left + rect.width) + "px";
        ore.style.top = rect.top + "px";
    }
    }, 10);

//th3
setInterval(() => {
    if(document.getElementById('table1_th3')){
        var omae = document.getElementById('table1_th2');
        var ore = document.getElementById('table1_th3');
        var rect = omae.getBoundingClientRect();
        ore.style.left = (rect.left + rect.width) + "px";
        ore.style.top = rect.top + "px";
    }
    }, 10);

//th4
setInterval(() => {
    if(document.getElementById('table1_th4')){
        var omae = document.getElementById('table1_th3');
        var ore = document.getElementById('table1_th4');
        var rect = omae.getBoundingClientRect();
        ore.style.left = (rect.left + rect.width) + "px";
        ore.style.top = rect.top + "px";
    }
    }, 10);

//th5
setInterval(() => {
    if(document.getElementById('table1_th5')){
        var omae = document.getElementById('table1_th4');
        var ore = document.getElementById('table1_th5');
        var rect = omae.getBoundingClientRect();
        ore.style.left = (rect.left + rect.width) + "px";
        ore.style.top = rect.top + "px";
    }
    }, 10);

//th6
setInterval(() => {
    if(document.getElementById('table1_th6')){
        var omae = document.getElementById('table1_th5');
        var ore = document.getElementById('table1_th6');
        var rect = omae.getBoundingClientRect();
        ore.style.left = (rect.left + rect.width) + "px";
        ore.style.top = rect.top + "px";
    }
    }, 10);

//１行目********************************************************************

//row1_1
setInterval(() => {
    if(document.getElementById('table1_th1_row1')){
        var omae = document.getElementById('table1_th1');
        var ore = document.getElementById('table1_th1_row1');
        var rect = omae.getBoundingClientRect();
        ore.style.left = rect.left + "px";
        ore.style.top = rect.bottom + "px";
    }
    }, 10);

//row1_2
setInterval(() => {
    if(document.getElementById('table1_th2_row1')){
        var omae = document.getElementById('table1_th2');
        var ore = document.getElementById('table1_th2_row1');
        var rect = omae.getBoundingClientRect();
        ore.style.left = rect.left + "px";
        ore.style.top = rect.bottom + "px";
    }
    }, 10);

//row1_3
setInterval(() => {
    if(document.getElementById('table1_th3_row1')){
        var omae = document.getElementById('table1_th3');
        var ore = document.getElementById('table1_th3_row1');
        var rect = omae.getBoundingClientRect();
        ore.style.left = rect.left + "px";
        ore.style.top = rect.bottom + "px";
    }
    }, 10);

//row1_4
setInterval(() => {
    if(document.getElementById('table1_th4_row1')){
        var omae = document.getElementById('table1_th4');
        var ore = document.getElementById('table1_th4_row1');
        var rect = omae.getBoundingClientRect();
        ore.style.left = rect.left + "px";
        ore.style.top = rect.bottom + "px";
    }
    }, 10);

//row1_5
setInterval(() => {
    if(document.getElementById('table1_th5_row1')){
        var omae = document.getElementById('table1_th5');
        var ore = document.getElementById('table1_th5_row1');
        var rect = omae.getBoundingClientRect();
        ore.style.left = rect.left + "px";
        ore.style.top = rect.bottom + "px";
    }
    }, 10);

//row1_6
setInterval(() => {
    if(document.getElementById('table1_th6_row1')){
        var omae = document.getElementById('table1_th6');
        var ore = document.getElementById('table1_th6_row1');
        var rect = omae.getBoundingClientRect();
        ore.style.left = rect.left + "px";
        ore.style.top = rect.bottom + "px";
    }
    }, 10);

//２行目********************************************************************

//row2_1
setInterval(() => {
    if(document.getElementById('table1_th1_row2')){
        var omae = document.getElementById('table1_th1_row1');
        var ore = document.getElementById('table1_th1_row2');
        var rect = omae.getBoundingClientRect();
        ore.style.left = rect.left + "px";
        ore.style.top = rect.bottom + "px";
    }
    }, 10);

//row2_2
setInterval(() => {
    if(document.getElementById('table1_th2_row2')){
        var omae = document.getElementById('table1_th2_row1');
        var ore = document.getElementById('table1_th2_row2');
        var rect = omae.getBoundingClientRect();
        ore.style.left = rect.left + "px";
        ore.style.top = rect.bottom + "px";
    }
    }, 10);

//row2_3
setInterval(() => {
    if (document.getElementById('table1_th3_row2')) {
        var omae = document.getElementById('table1_th3_row1');
        var ore = document.getElementById('table1_th3_row2');
        var rect = omae.getBoundingClientRect();
        ore.style.left = rect.left + "px";
        ore.style.top = rect.bottom + "px";
    }
}, 10);

//row2_4
setInterval(() => {
    if (document.getElementById('table1_th4_row2')) {
        var omae = document.getElementById('table1_th4_row1');
        var ore = document.getElementById('table1_th4_row2');
        var rect = omae.getBoundingClientRect();
        ore.style.left = rect.left + "px";
        ore.style.top = rect.bottom + "px";
    }
}, 10);

//row2_5
setInterval(() => {
    if (document.getElementById('table1_th5_row2')) {
        var omae = document.getElementById('table1_th5_row1');
        var ore = document.getElementById('table1_th5_row2');
        var rect = omae.getBoundingClientRect();
        ore.style.left = rect.left + "px";
        ore.style.top = rect.bottom + "px";
    }
}, 10);

//row2_6
setInterval(() => {
    if (document.getElementById('table1_th6_row2')) {
        var omae = document.getElementById('table1_th6_row1');
        var ore = document.getElementById('table1_th6_row2');
        var rect = omae.getBoundingClientRect();
        ore.style.left = rect.left + "px";
        ore.style.top = rect.bottom + "px";
    }
}, 10);

//3行目********************************************************************

//row3_1
setInterval(() => {
    if (document.getElementById('table1_th1_row3')) {
        var omae = document.getElementById('table1_th1_row2');
        var ore = document.getElementById('table1_th1_row3');
        var rect = omae.getBoundingClientRect();
        ore.style.left = rect.left + "px";
        ore.style.top = rect.bottom + "px";
    }
}, 10);

//row3_2
setInterval(() => {
    if (document.getElementById('table1_th2_row3')) {
        var omae = document.getElementById('table1_th2_row2');
        var ore = document.getElementById('table1_th2_row3');
        var rect = omae.getBoundingClientRect();
        ore.style.left = rect.left + "px";
        ore.style.top = rect.bottom + "px";
    }
}, 10);

//row3_3
setInterval(() => {
    if (document.getElementById('table1_th3_row3')) {
        var omae = document.getElementById('table1_th3_row2');
        var ore = document.getElementById('table1_th3_row3');
        var rect = omae.getBoundingClientRect();
        ore.style.left = rect.left + "px";
        ore.style.top = rect.bottom + "px";
    }
}, 10);

//row3_4
setInterval(() => {
    if (document.getElementById('table1_th4_row3')) {
        var omae = document.getElementById('table1_th4_row2');
        var ore = document.getElementById('table1_th4_row3');
        var rect = omae.getBoundingClientRect();
        ore.style.left = rect.left + "px";
        ore.style.top = rect.bottom + "px";
    }
}, 10);

//row3_5
setInterval(() => {
    if (document.getElementById('table1_th5_row3')) {
        var omae = document.getElementById('table1_th5_row2');
        var ore = document.getElementById('table1_th5_row3');
        var rect = omae.getBoundingClientRect();
        ore.style.left = rect.left + "px";
        ore.style.top = rect.bottom + "px";
    }
}, 10);

//row3_6
setInterval(() => {
    if (document.getElementById('table1_th6_row3')) {
        var omae = document.getElementById('table1_th6_row2');
        var ore = document.getElementById('table1_th6_row3');
        var rect = omae.getBoundingClientRect();
        ore.style.left = rect.left + "px";
        ore.style.top = rect.bottom + "px";
    }
}, 10);

//row4_1
setInterval(() => {
    if (document.getElementById('table1_th1_row4')) {
        var omae = document.getElementById('table1_th1_row3');
        var ore = document.getElementById('table1_th1_row4');
        var rect = omae.getBoundingClientRect();
        ore.style.left = rect.left + "px";
        ore.style.top = rect.bottom + "px";
    }
}, 10);

//row4_2
setInterval(() => {
    if (document.getElementById('table1_th2_row4')) {
        var omae = document.getElementById('table1_th2_row3');
        var ore = document.getElementById('table1_th2_row4');
        var rect = omae.getBoundingClientRect();
        ore.style.left = rect.left + "px";
        ore.style.top = rect.bottom + "px";
    }
}, 10);

//row4_3
setInterval(() => {
    if (document.getElementById('table1_th3_row4')) {
        var omae = document.getElementById('table1_th3_row3');
        var ore = document.getElementById('table1_th3_row4');
        var rect = omae.getBoundingClientRect();
        ore.style.left = rect.left + "px";
        ore.style.top = rect.bottom + "px";
    }
}, 10);

//row4_4
setInterval(() => {
    if (document.getElementById('table1_th4_row4')) {
        var omae = document.getElementById('table1_th4_row3');
        var ore = document.getElementById('table1_th4_row4');
        var rect = omae.getBoundingClientRect();
        ore.style.left = rect.left + "px";
        ore.style.top = rect.bottom + "px";
    }
}, 10);

//row4_5
setInterval(() => {
    if (document.getElementById('table1_th5_row4')) {
        var omae = document.getElementById('table1_th5_row3');
        var ore = document.getElementById('table1_th5_row4');
        var rect = omae.getBoundingClientRect();
        ore.style.left = rect.left + "px";
        ore.style.top = rect.bottom + "px";
    }
}, 10);

//row4_6
setInterval(() => {
    if (document.getElementById('table1_th6_row4')) {
        var omae = document.getElementById('table1_th6_row3');
        var ore = document.getElementById('table1_th6_row4');
        var rect = omae.getBoundingClientRect();
        ore.style.left = rect.left + "px";
        ore.style.top = rect.bottom + "px";
    }
}, 10);

//row5_1
setInterval(() => {
    if (document.getElementById('table1_th1_row5')) {
        var omae = document.getElementById('table1_th1_row4');
        var ore = document.getElementById('table1_th1_row5');
        var rect = omae.getBoundingClientRect();
        ore.style.left = rect.left + "px";
        ore.style.top = rect.bottom + "px";
    }
}, 10);

//row5_2
setInterval(() => {
    if (document.getElementById('table1_th2_row5')) {
        var omae = document.getElementById('table1_th2_row4');
        var ore = document.getElementById('table1_th2_row5');
        var rect = omae.getBoundingClientRect();
        ore.style.left = rect.left + "px";
        ore.style.top = rect.bottom + "px";
    }
}, 10);

//row5_3
setInterval(() => {
    if (document.getElementById('table1_th3_row5')) {
        var omae = document.getElementById('table1_th3_row4');
        var ore = document.getElementById('table1_th3_row5');
        var rect = omae.getBoundingClientRect();
        ore.style.left = rect.left + "px";
        ore.style.top = rect.bottom + "px";
    }
}, 10);

//row5_4
setInterval(() => {
    if (document.getElementById('table1_th4_row5')) {
        var omae = document.getElementById('table1_th4_row4');
        var ore = document.getElementById('table1_th4_row5');
        var rect = omae.getBoundingClientRect();
        ore.style.left = rect.left + "px";
        ore.style.top = rect.bottom + "px";
    }
}, 10);

//row5_5
setInterval(() => {
    if (document.getElementById('table1_th5_row5')) {
        var omae = document.getElementById('table1_th5_row4');
        var ore = document.getElementById('table1_th5_row5');
        var rect = omae.getBoundingClientRect();
        ore.style.left = rect.left + "px";
        ore.style.top = rect.bottom + "px";
    }
}, 10);

//row5_6
setInterval(() => {
    if (document.getElementById('table1_th6_row5')) {
        var omae = document.getElementById('table1_th6_row4');
        var ore = document.getElementById('table1_th6_row5');
        var rect = omae.getBoundingClientRect();
        ore.style.left = rect.left + "px";
        ore.style.top = rect.bottom + "px";
    }
}, 10);

//row6_1
setInterval(() => {
    if (document.getElementById('table1_th1_row6')) {
        var omae = document.getElementById('table1_th1_row5');
        var ore = document.getElementById('table1_th1_row6');
        var rect = omae.getBoundingClientRect();
        ore.style.left = rect.left + "px";
        ore.style.top = rect.bottom + "px";
    }
}, 10);

//row6_2
setInterval(() => {
    if (document.getElementById('table1_th2_row6')) {
        var omae = document.getElementById('table1_th2_row5');
        var ore = document.getElementById('table1_th2_row6');
        var rect = omae.getBoundingClientRect();
        ore.style.left = rect.left + "px";
        ore.style.top = rect.bottom + "px";
    }
}, 10);

//row6_3
setInterval(() => {
    if (document.getElementById('table1_th3_row6')) {
        var omae = document.getElementById('table1_th3_row5');
        var ore = document.getElementById('table1_th3_row6');
        var rect = omae.getBoundingClientRect();
        ore.style.left = rect.left + "px";
        ore.style.top = rect.bottom + "px";
    }
}, 10);

//row6_4
setInterval(() => {
    if (document.getElementById('table1_th4_row6')) {
        var omae = document.getElementById('table1_th4_row5');
        var ore = document.getElementById('table1_th4_row6');
        var rect = omae.getBoundingClientRect();
        ore.style.left = rect.left + "px";
        ore.style.top = rect.bottom + "px";
    }
}, 10);

//row6_5
setInterval(() => {
    if (document.getElementById('table1_th5_row6')) {
        var omae = document.getElementById('table1_th5_row5');
        var ore = document.getElementById('table1_th5_row6');
        var rect = omae.getBoundingClientRect();
        ore.style.left = rect.left + "px";
        ore.style.top = rect.bottom + "px";
    }
}, 10);

//row6_6
setInterval(() => {
    if (document.getElementById('table1_th6_row6')) {
        var omae = document.getElementById('table1_th6_row5');
        var ore = document.getElementById('table1_th6_row6');
        var rect = omae.getBoundingClientRect();
        ore.style.left = rect.left + "px";
        ore.style.top = rect.bottom + "px";
    }
}, 10);

//row7_1
setInterval(() => {
    if (document.getElementById('table1_th1_row7')) {
        var omae = document.getElementById('table1_th1_row6');
        var ore = document.getElementById('table1_th1_row7');
        var rect = omae.getBoundingClientRect();
        ore.style.left = rect.left + "px";
        ore.style.top = rect.bottom + "px";
    }
}, 10);

//row7_2
setInterval(() => {
    if (document.getElementById('table1_th2_row7')) {
        var omae = document.getElementById('table1_th2_row6');
        var ore = document.getElementById('table1_th2_row7');
        var rect = omae.getBoundingClientRect();
        ore.style.left = rect.left + "px";
        ore.style.top = rect.bottom + "px";
    }
}, 10);

//row7_3
setInterval(() => {
    if (document.getElementById('table1_th3_row7')) {
        var omae = document.getElementById('table1_th3_row6');
        var ore = document.getElementById('table1_th3_row7');
        var rect = omae.getBoundingClientRect();
        ore.style.left = rect.left + "px";
        ore.style.top = rect.bottom + "px";
    }
}, 10);

//row7_4
setInterval(() => {
    if (document.getElementById('table1_th4_row7')) {
        var omae = document.getElementById('table1_th4_row6');
        var ore = document.getElementById('table1_th4_row7');
        var rect = omae.getBoundingClientRect();
        ore.style.left = rect.left + "px";
        ore.style.top = rect.bottom + "px";
    }
}, 10);

//row7_5
setInterval(() => {
    if (document.getElementById('table1_th5_row7')) {
        var omae = document.getElementById('table1_th5_row6');
        var ore = document.getElementById('table1_th5_row7');
        var rect = omae.getBoundingClientRect();
        ore.style.left = rect.left + "px";
        ore.style.top = rect.bottom + "px";
    }
}, 10);

//row7_6
setInterval(() => {
    if (document.getElementById('table1_th6_row7')) {
        var omae = document.getElementById('table1_th6_row6');
        var ore = document.getElementById('table1_th6_row7');
        var rect = omae.getBoundingClientRect();
        ore.style.left = rect.left + "px";
        ore.style.top = rect.bottom + "px";
    }
}, 10);

//row8_1
setInterval(() => {
    if (document.getElementById('table1_th1_row8')) {
        var omae = document.getElementById('table1_th1_row7');
        var ore = document.getElementById('table1_th1_row8');
        var rect = omae.getBoundingClientRect();
        ore.style.left = rect.left + "px";
        ore.style.top = rect.bottom + "px";
    }
}, 10);

//row8_2
setInterval(() => {
    if (document.getElementById('table1_th2_row8')) {
        var omae = document.getElementById('table1_th2_row7');
        var ore = document.getElementById('table1_th2_row8');
        var rect = omae.getBoundingClientRect();
        ore.style.left = rect.left + "px";
        ore.style.top = rect.bottom + "px";
    }
}, 10);

//row8_3
setInterval(() => {
    if (document.getElementById('table1_th3_row8')) {
        var omae = document.getElementById('table1_th3_row7');
        var ore = document.getElementById('table1_th3_row8');
        var rect = omae.getBoundingClientRect();
        ore.style.left = rect.left + "px";
        ore.style.top = rect.bottom + "px";
    }
}, 10);

//row8_4
setInterval(() => {
    if (document.getElementById('table1_th4_row8')) {
        var omae = document.getElementById('table1_th4_row7');
        var ore = document.getElementById('table1_th4_row8');
        var rect = omae.getBoundingClientRect();
        ore.style.left = rect.left + "px";
        ore.style.top = rect.bottom + "px";
    }
}, 10);

//row8_5
setInterval(() => {
    if (document.getElementById('table1_th5_row8')) {
        var omae = document.getElementById('table1_th5_row7');
        var ore = document.getElementById('table1_th5_row8');
        var rect = omae.getBoundingClientRect();
        ore.style.left = rect.left + "px";
        ore.style.top = rect.bottom + "px";
    }
}, 10);

//row8_6
setInterval(() => {
    if (document.getElementById('table1_th6_row8')) {
        var omae = document.getElementById('table1_th6_row7');
        var ore = document.getElementById('table1_th6_row8');
        var rect = omae.getBoundingClientRect();
        ore.style.left = rect.left + "px";
        ore.style.top = rect.bottom + "px";
    }
}, 10);



/**************テーブルのheightを統一******************************************************/

// ｔｈ

setInterval(() => {
    const th1 = document.getElementById('table1_th1');
    if (th1) {
        const th_height = th1.getBoundingClientRect().height + "px";

        // 2
        const th2 = document.getElementById('table1_th2');
        if (th2) {
            th2.style.height = th_height;
        }

        // 3
        const th3 = document.getElementById('table1_th3');
        if (th3) {
            th3.style.height = th_height;
        }

        // 4
        const th4 = document.getElementById('table1_th4');
        if (th4) {
            th4.style.height = th_height;
        }

        // 5
        const th5 = document.getElementById('table1_th5');
        if (th5) {
            th5.style.height = th_height;
        }

        // 6
        const th6 = document.getElementById('table1_th6');
        if (th6) {
            th6.style.height = th_height;
        }
    }
}, 10);


// row1

setInterval(() => {
    const th1 = document.getElementById('table1_th1_row1');
    if (th1) {
        const th_height = th1.getBoundingClientRect().height + "px";

        // 2
        const th2 = document.getElementById('table1_th2_row1');
        if (th2) {
            th2.style.height = th_height;
        }

        // 3
        const th3 = document.getElementById('table1_th3_row1');
        if (th3) {
            th3.style.height = th_height;
        }

        // 4
        const th4 = document.getElementById('table1_th4_row1');
        if (th4) {
            th4.style.height = th_height;
        }

        // 5
        const th5 = document.getElementById('table1_th5_row1');
        if (th5) {
            th5.style.height = th_height;
        }

        // 6
        const th6 = document.getElementById('table1_th6_row1');
        if (th6) {
            th6.style.height = th_height;
        }
    }
}, 10);

// row2

setInterval(() => {
    const th1 = document.getElementById('table1_th1_row2');
    if (th1) {
        const th_height = th1.getBoundingClientRect().height + "px";

        // 2
        const th2 = document.getElementById('table1_th2_row2');
        if (th2) {
            th2.style.height = th_height;
        }

        // 3
        const th3 = document.getElementById('table1_th3_row2');
        if (th3) {
            th3.style.height = th_height;
        }

        // 4
        const th4 = document.getElementById('table1_th4_row2');
        if (th4) {
            th4.style.height = th_height;
        }

        // 5
        const th5 = document.getElementById('table1_th5_row2');
        if (th5) {
            th5.style.height = th_height;
        }

        // 6
        const th6 = document.getElementById('table1_th6_row2');
        if (th6) {
            th6.style.height = th_height;
        }
    }
}, 10);

// row1
setInterval(() => {
    const th1 = document.getElementById('table1_th1_row1');
    if (th1) {
        const th_height = th1.getBoundingClientRect().height + "px";

        // 2
        const th2 = document.getElementById('table1_th2_row1');
        if (th2) {
            th2.style.height = th_height;
        }

        // 3
        const th3 = document.getElementById('table1_th3_row1');
        if (th3) {
            th3.style.height = th_height;
        }

        // 4
        const th4 = document.getElementById('table1_th4_row1');
        if (th4) {
            th4.style.height = th_height;
        }

        // 5
        const th5 = document.getElementById('table1_th5_row1');
        if (th5) {
            th5.style.height = th_height;
        }

        // 6
        const th6 = document.getElementById('table1_th6_row1');
        if (th6) {
            th6.style.height = th_height;
        }
    }
}, 10);

// row2
setInterval(() => {
    const th1 = document.getElementById('table1_th1_row2');
    if (th1) {
        const th_height = th1.getBoundingClientRect().height + "px";

        // 2
        const th2 = document.getElementById('table1_th2_row2');
        if (th2) {
            th2.style.height = th_height;
        }

        // 3
        const th3 = document.getElementById('table1_th3_row2');
        if (th3) {
            th3.style.height = th_height;
        }

        // 4
        const th4 = document.getElementById('table1_th4_row2');
        if (th4) {
            th4.style.height = th_height;
        }

        // 5
        const th5 = document.getElementById('table1_th5_row2');
        if (th5) {
            th5.style.height = th_height;
        }

        // 6
        const th6 = document.getElementById('table1_th6_row2');
        if (th6) {
            th6.style.height = th_height;
        }
    }
}, 10);

// row3
setInterval(() => {
    const th1 = document.getElementById('table1_th1_row3');
    if (th1) {
        const th_height = th1.getBoundingClientRect().height + "px";

        // 2
        const th2 = document.getElementById('table1_th2_row3');
        if (th2) {
            th2.style.height = th_height;
        }

        // 3
        const th3 = document.getElementById('table1_th3_row3');
        if (th3) {
            th3.style.height = th_height;
        }

        // 4
        const th4 = document.getElementById('table1_th4_row3');
        if (th4) {
            th4.style.height = th_height;
        }

        // 5
        const th5 = document.getElementById('table1_th5_row3');
        if (th5) {
            th5.style.height = th_height;
        }

        // 6
        const th6 = document.getElementById('table1_th6_row3');
        if (th6) {
            th6.style.height = th_height;
        }
    }
}, 10);

// row4
setInterval(() => {
    const th1 = document.getElementById('table1_th1_row4');
    if (th1) {
        const th_height = th1.getBoundingClientRect().height + "px";

        // 2
        const th2 = document.getElementById('table1_th2_row4');
        if (th2) {
            th2.style.height = th_height;
        }

        // 3
        const th3 = document.getElementById('table1_th3_row4');
        if (th3) {
            th3.style.height = th_height;
        }

        // 4
        const th4 = document.getElementById('table1_th4_row4');
        if (th4) {
            th4.style.height = th_height;
        }

        // 5
        const th5 = document.getElementById('table1_th5_row4');
        if (th5) {
            th5.style.height = th_height;
        }

        // 6
        const th6 = document.getElementById('table1_th6_row4');
        if (th6) {
            th6.style.height = th_height;
        }
    }
}, 10);

// row5
setInterval(() => {
    const th1 = document.getElementById('table1_th1_row5');
    if (th1) {
        const th_height = th1.getBoundingClientRect().height + "px";

        // 2
        const th2 = document.getElementById('table1_th2_row5');
        if (th2) {
            th2.style.height = th_height;
        }

        // 3
        const th3 = document.getElementById('table1_th3_row5');
        if (th3) {
            th3.style.height = th_height;
        }

        // 4
        const th4 = document.getElementById('table1_th4_row5');
        if (th4) {
            th4.style.height = th_height;
        }

        // 5
        const th5 = document.getElementById('table1_th5_row5');
        if (th5) {
            th5.style.height = th_height;
        }

        // 6
        const th6 = document.getElementById('table1_th6_row5');
        if (th6) {
            th6.style.height = th_height;
        }
    }
}, 10);

// row6
setInterval(() => {
    const th1 = document.getElementById('table1_th1_row6');
    if (th1) {
        const th_height = th1.getBoundingClientRect().height + "px";

        // 2
        const th2 = document.getElementById('table1_th2_row6');
        if (th2) {
            th2.style.height = th_height;
        }

        // 3
        const th3 = document.getElementById('table1_th3_row6');
        if (th3) {
            th3.style.height = th_height;
        }

        // 4
        const th4 = document.getElementById('table1_th4_row6');
        if (th4) {
            th4.style.height = th_height;
        }

        // 5
        const th5 = document.getElementById('table1_th5_row6');
        if (th5) {
            th5.style.height = th_height;
        }

        // 6
        const th6 = document.getElementById('table1_th6_row6');
        if (th6) {
            th6.style.height = th_height;
        }
    }
}, 10);

// row7
setInterval(() => {
    const th1 = document.getElementById('table1_th1_row7');
    if (th1) {
        const th_height = th1.getBoundingClientRect().height + "px";

        // 2
        const th2 = document.getElementById('table1_th2_row7');
        if (th2) {
            th2.style.height = th_height;
        }

        // 3
        const th3 = document.getElementById('table1_th3_row7');
        if (th3) {
            th3.style.height = th_height;
        }

        // 4
        const th4 = document.getElementById('table1_th4_row7');
        if (th4) {
            th4.style.height = th_height;
        }

        // 5
        const th5 = document.getElementById('table1_th5_row7');
        if (th5) {
            th5.style.height = th_height;
        }

        // 6
        const th6 = document.getElementById('table1_th6_row7');
        if (th6) {
            th6.style.height = th_height;
        }
    }
}, 10);

// row8
setInterval(() => {
    const th1 = document.getElementById('table1_th1_row8');
    if (th1) {
        const th_height = th1.getBoundingClientRect().height + "px";

        // 2
        const th2 = document.getElementById('table1_th2_row8');
        if (th2) {
            th2.style.height = th_height;
        }

        // 3
        const th3 = document.getElementById('table1_th3_row8');
        if (th3) {
            th3.style.height = th_height;
        }

        // 4
        const th4 = document.getElementById('table1_th4_row8');
        if (th4) {
            th4.style.height = th_height;
        }

        // 5
        const th5 = document.getElementById('table1_th5_row8');
        if (th5) {
            th5.style.height = th_height;
        }

        // 6
        const th6 = document.getElementById('table1_th6_row8');
        if (th6) {
            th6.style.height = th_height;
        }
    }
}, 10);


//*******widthを自動調整　明細********************************************** */

// th1 監視
setInterval(() => {
    const th1 = document.getElementById('table1_th1');
    if (th1) {
        const th_width = th1.getBoundingClientRect().width + "px";
        // 1
        const row1 = document.getElementById('table1_th1_row1');
        if (row1) {
            row1.style.width = th_width;
        }
        // 2
        const row2 = document.getElementById('table1_th1_row2');
        if (row2) {
            row2.style.width = th_width;
        }
        // 3
        const row3 = document.getElementById('table1_th1_row3');
        if (row3) {
            row3.style.width = th_width;
        }
        // 4
        const row4 = document.getElementById('table1_th1_row4');
        if (row4) {
            row4.style.width = th_width;
        }
        // 5
        const row5 = document.getElementById('table1_th1_row5');
        if (row5) {
            row5.style.width = th_width;
        }
        // 6
        const row6 = document.getElementById('table1_th1_row6');
        if (row6) {
            row6.style.width = th_width;
        }
        // 7
        const row7 = document.getElementById('table1_th1_row7');
        if (row7) {
            row7.style.width = th_width;
        }
        // 8
        const row8 = document.getElementById('table1_th1_row8');
        if (row8) {
            row8.style.width = th_width;
        }
    }
}, 10);

// th2 監視
setInterval(() => {
    const th2 = document.getElementById('table1_th2');
    if (th2) {
        const th_width = th2.getBoundingClientRect().width + "px";
        // 1
        const row1 = document.getElementById('table1_th2_row1');
        if (row1) {
            row1.style.width = th_width;
        }
        // 2
        const row2 = document.getElementById('table1_th2_row2');
        if (row2) {
            row2.style.width = th_width;
        }
        // 3
        const row3 = document.getElementById('table1_th2_row3');
        if (row3) {
            row3.style.width = th_width;
        }
        // 4
        const row4 = document.getElementById('table1_th2_row4');
        if (row4) {
            row4.style.width = th_width;
        }
        // 5
        const row5 = document.getElementById('table1_th2_row5');
        if (row5) {
            row5.style.width = th_width;
        }
        // 6
        const row6 = document.getElementById('table1_th2_row6');
        if (row6) {
            row6.style.width = th_width;
        }
        // 7
        const row7 = document.getElementById('table1_th2_row7');
        if (row7) {
            row7.style.width = th_width;
        }
        // 8
        const row8 = document.getElementById('table1_th2_row8');
        if (row8) {
            row8.style.width = th_width;
        }
    }
}, 10);

// th3 監視
setInterval(() => {
    const th3 = document.getElementById('table1_th3');
    if (th3) {
        const th_width = th3.getBoundingClientRect().width + "px";
        // 1
        const row1 = document.getElementById('table1_th3_row1');
        if (row1) {
            row1.style.width = th_width;
        }
        // 2
        const row2 = document.getElementById('table1_th3_row2');
        if (row2) {
            row2.style.width = th_width;
        }
        // 3
        const row3 = document.getElementById('table1_th3_row3');
        if (row3) {
            row3.style.width = th_width;
        }
        // 4
        const row4 = document.getElementById('table1_th3_row4');
        if (row4) {
            row4.style.width = th_width;
        }
        // 5
        const row5 = document.getElementById('table1_th3_row5');
        if (row5) {
            row5.style.width = th_width;
        }
        // 6
        const row6 = document.getElementById('table1_th3_row6');
        if (row6) {
            row6.style.width = th_width;
        }
        // 7
        const row7 = document.getElementById('table1_th3_row7');
        if (row7) {
            row7.style.width = th_width;
        }
        // 8
        const row8 = document.getElementById('table1_th3_row8');
        if (row8) {
            row8.style.width = th_width;
        }
    }
}, 10);

// th4 監視
setInterval(() => {
    const th4 = document.getElementById('table1_th4');
    if (th4) {
        const th_width = th4.getBoundingClientRect().width + "px";
        // 1
        const row1 = document.getElementById('table1_th4_row1');
        if (row1) {
            row1.style.width = th_width;
        }
        // 2
        const row2 = document.getElementById('table1_th4_row2');
        if (row2) {
            row2.style.width = th_width;
        }
        // 3
        const row3 = document.getElementById('table1_th4_row3');
        if (row3) {
            row3.style.width = th_width;
        }
        // 4
        const row4 = document.getElementById('table1_th4_row4');
        if (row4) {
            row4.style.width = th_width;
        }
        // 5
        const row5 = document.getElementById('table1_th4_row5');
        if (row5) {
            row5.style.width = th_width;
        }
        // 6
        const row6 = document.getElementById('table1_th4_row6');
        if (row6) {
            row6.style.width = th_width;
        }
        // 7
        const row7 = document.getElementById('table1_th4_row7');
        if (row7) {
            row7.style.width = th_width;
        }
        // 8
        const row8 = document.getElementById('table1_th4_row8');
        if (row8) {
            row8.style.width = th_width;
        }
    }
}, 10);

// th5 監視
setInterval(() => {
    const th5 = document.getElementById('table1_th5');
    if (th5) {
        const th_width = th5.getBoundingClientRect().width + "px";
        // 1
        const row1 = document.getElementById('table1_th5_row1');
        if (row1) {
            row1.style.width = th_width;
        }
        // 2
        const row2 = document.getElementById('table1_th5_row2');
        if (row2) {
            row2.style.width = th_width;
        }
        // 3
        const row3 = document.getElementById('table1_th5_row3');
        if (row3) {
            row3.style.width = th_width;
        }
        // 4
        const row4 = document.getElementById('table1_th5_row4');
        if (row4) {
            row4.style.width = th_width;
        }
        // 5
        const row5 = document.getElementById('table1_th5_row5');
        if (row5) {
            row5.style.width = th_width;
        }
        // 6
        const row6 = document.getElementById('table1_th5_row6');
        if (row6) {
            row6.style.width = th_width;
        }
        // 7
        const row7 = document.getElementById('table1_th5_row7');
        if (row7) {
            row7.style.width = th_width;
        }
        // 8
        const row8 = document.getElementById('table1_th5_row8');
        if (row8) {
            row8.style.width = th_width;
        }
    }
}, 10);

// th6 監視
setInterval(() => {
    const th6 = document.getElementById('table1_th6');
    if (th6) {
        const th_width = th6.getBoundingClientRect().width + "px";
        // 1
        const row1 = document.getElementById('table1_th6_row1');
        if (row1) {
            row1.style.width = th_width;
        }
        // 2
        const row2 = document.getElementById('table1_th6_row2');
        if (row2) {
            row2.style.width = th_width;
        }
        // 3
        const row3 = document.getElementById('table1_th6_row3');
        if (row3) {
            row3.style.width = th_width;
        }
        // 4
        const row4 = document.getElementById('table1_th6_row4');
        if (row4) {
            row4.style.width = th_width;
        }
        // 5
        const row5 = document.getElementById('table1_th6_row5');
        if (row5) {
            row5.style.width = th_width;
        }
        // 6
        const row6 = document.getElementById('table1_th6_row6');
        if (row6) {
            row6.style.width = th_width;
        }
        // 7
        const row7 = document.getElementById('table1_th6_row7');
        if (row7) {
            row7.style.width = th_width;
        }
        // 8
        const row8 = document.getElementById('table1_th6_row8');
        if (row8) {
            row8.style.width = th_width;
        }
    }
}, 10);

/*********************追加ボタン　動的位置調整********************** */

// header
setInterval(() => {
    const button = document.getElementById('add_header_button1');
    if (button) {
        var last_th = count_th_map.get(1);
        var th = document.getElementById('table1_th' + last_th);
        var rect = th.getBoundingClientRect();
        button.style.left=(rect.left+rect.width)+"px";
        button.style.top=rect.top+"px";
    }
}, 10);

//row
setInterval(() => {
    const button = document.getElementById('add_row_button1');
    if (button) {
        var last_row = count_row_map.get(1);
        var th = document.getElementById('table1_th1_row' + last_row);
        var rect = th.getBoundingClientRect();
        button.style.left=rect.left+"px";
        button.style.top=rect.bottom+"px";
    }
}, 10);

/***********************************************************/

function create_html(){
    if(document.getElementById('label1') || document.getElementById('textbox1') || document.getElementById('radio1_1') || document.getElementById('command1') || document.getElementById('table1_th1')){
        result_code="";
        result_code+=templete_head;
        create_label();
        create_textbox();
        create_command();
        create_radio1();
        create_radio2();
        create_radio3();
        create_radio4();
        create_table();
        result_code+=templete_body;
        pop_up();
    }else{
        alert("生成対象が見つかりませんでした。");
    }
}

function pop_up() {
    // 新しい div 要素を作成
    var pop = document.createElement("div");
    pop.style.width = "978px";
    pop.style.height = "550px";
    pop.style.backgroundColor = "black";
    pop.style.position = "absolute";
    pop.style.top = "50px";
    pop.style.left = "50px";
    pop.id = "back_div";
    pop.style.zIndex=3;
    // 新しい input 要素を作成
    var input = document.createElement("textarea");
    input.style.width = "100%";
    input.style.height = "100%";
    input.style.backgroundColor = "black";
    input.style.color = "rgb(102, 220, 145)";
    input.value=result_code;
    input.style.zIndex=4;
    // input.style.fontSize="17px";
    input.id = "back_input";
    pop.appendChild(input);
    document.body.appendChild(pop);
    //コピーボタン
    var copy_button = document.getElementById('copy_button');
    copy_button.hidden=false;
    copy_button.style.zIndex=5;
    copy_button.style.position="absolute";
    var rect = input.getBoundingClientRect();
    copy_button.style.left=rect.right-190+"px";
    copy_button.style.top=rect.bottom-35+"px";
    copy_button.style.backgroundColor="black";
    //プレビューボタン
    var preview_button = document.getElementById('preview_button');
    preview_button.hidden=false;
    preview_button.style.zIndex=5;
    preview_button.style.position="absolute";
    var rect = input.getBoundingClientRect();
    preview_button.style.left=rect.right-290+"px";
    preview_button.style.top=rect.bottom-35+"px";
    preview_button.style.backgroundColor="black";
    //×ボタン
    var delete_button = document.getElementById('delete_button');
    delete_button.hidden=false;
    delete_button.style.zIndex=5;
    delete_button.style.position="absolute";
    delete_button.style.border="none";
    delete_button.style.fontSize="20px";
    var rect = input.getBoundingClientRect();
    delete_button.style.left=rect.right-40+"px";
    delete_button.style.top=rect.top+2+"px";
    delete_button.style.backgroundColor="black";
    disabled_change(true);
}

function copy_click(){
    navigator.clipboard.writeText(result_code);
    alert("生成コードがクリップボードにコピーされました。");
}

function delete_click(){
    var copy_button = document.getElementById('copy_button');
    var delete_button = document.getElementById('delete_button');
    var back_div = document.getElementById('back_div');
    var back_input = document.getElementById('back_input');
    copy_button.hidden=true;
    preview_button.hidden=true;
    delete_button.hidden=true;
    back_div.remove();
    back_input.remove();
    disabled_change(false);
}

function disabled_change(a){
    var create_html_button = document.getElementById('create_html_button');
    var button_label = document.getElementById('button_label');
    var button_textbox = document.getElementById('button_textbox');
    var button_radio = document.getElementById('button_radio');
    var button_command = document.getElementById('button_command');
    var button_table = document.getElementById('button_table');
    create_html_button.disabled=a;
    button_label.disabled=a;
    button_textbox.disabled=a;
    button_radio.disabled=a;
    button_command.disabled=a;
    button_table.disabled=a;
};


//***********************************************************************************************　最終的に出力されるhtmlコード格納場所
var result_code = "";


//html文頭（※バッククオート shift + @）
const templete_head = `<!doctype html>
<html lang="ja">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
`;




//body閉じタグ
const templete_body = `
</body>
`;

//ラベルコード生成**********************************************************************************************

var templete_label_a = `    <label id="" style="position: absolute; left:`;
var templete_label_b = `%; top:`;
var templete_label_c = `%; width:`; 
var templete_label_d = `%; height:`; 
var templete_label_e = `%; font-size:`; 
var templete_label_f = `; ">`; 
var templete_label_g = `</label>
`; 

function create_label(){
    for(var i = 1; i <= 10; i++){
        if(document.getElementById('label'+i)){
        var code_label = "";
        var label = document.getElementById('label'+i);
        var area = document.getElementById('edit_area_header');
        var label9=label.getBoundingClientRect();
        var area9=area.getBoundingClientRect();
        var left = (label9.left-area9.left)/978 * 100; //%
        left = Math.round(left);
        var top = (label9.top-area9.top)/550 * 100; //%
        top = Math.round(top);
        var height = label9.height/978*100; //%
        height = Math.round(height);
        var width = label9.width/978*100; //%
        width = Math.round(width);
        var text = label.value;
        var computedStyle = getComputedStyle(label);
        var font = computedStyle.fontSize;
            // var string_font = font.toString();
            // var length = string_font.length;
            // var size = length.subString(0,(length-2));
            // var numeric_size = parseFloat(size);
            // font = Math.round(numeric_size);
        code_label += (templete_label_a + left + templete_label_b + top + templete_label_c + width + templete_label_d + height + templete_label_e + font + templete_label_f + text + templete_label_g); 
        result_code+=code_label;
        }
    }
}


//テキストボックスコード生成**********************************************************************************************

var templete_textbox_a = `  <input type="text" id="" style="position: absolute; left:`;
var templete_textbox_b = `%; top:`;
var templete_textbox_c = `%; width:`; 
var templete_textbox_d = `%; height:`; 
var templete_textbox_e = `%; font-size:`; 
var templete_textbox_f = `;" placeholder="`; 
var templete_textbox_g = ` ">
`; 

function create_textbox(){
    for(var i = 1; i <= 10; i++){
        if(document.getElementById('textbox'+i)){
        var code_textbox = "";
        var textbox = document.getElementById('textbox'+i);
        var area = document.getElementById('edit_area_header');
        var textbox9=textbox.getBoundingClientRect();
        var area9=area.getBoundingClientRect();
        var left = (textbox9.left-area9.left)/978 * 100; //%
        left = Math.round(left);
        var top = (textbox9.top-area9.top)/550 * 100; //%
        top = Math.round(top);
        var height = textbox9.height/978*100; //%
        height = Math.round(height);
        var width = textbox9.width/978*100; //%
        width = Math.round(width);
        var text = textbox.value;
        var computedStyle = getComputedStyle(textbox);
        var font = computedStyle.fontSize;
            // var string_font = font.toString();
            // var length = string_font.length;
            // var size = length.subString(0,(length-2));
            // var numeric_size = parseFloat(size);
            // font = numeric_size * 1.5 + "px";
        code_textbox += (templete_textbox_a + left + templete_textbox_b + top + templete_textbox_c + width + templete_textbox_d + height + templete_textbox_e + font + templete_textbox_f + text + templete_textbox_g); 
        result_code+=code_textbox;
        }
    }
}

//コマンドボタンコード生成**********************************************************************************************

var templete_command_a = `  <button id="" style="position: absolute; left:`;
var templete_command_b = `%; top:`;
var templete_command_c = `%; width:`; 
var templete_command_d = `%; height:`; 
var templete_command_e = `%; font-size:`; 
var templete_command_f = `;" >`; 
var templete_command_g = `  </button>
`; 

function create_command(){
    for(var i = 1; i <= 10; i++){
        if(document.getElementById('command'+i)){
        var code_command = "";
        var command = document.getElementById('command'+i);
        var area = document.getElementById('edit_area_header');
        var command9=command.getBoundingClientRect();
        var area9=area.getBoundingClientRect();
        var left = (command9.left-area9.left)/978 * 100; //%
        left = Math.round(left);
        var top = (command9.top-area9.top)/550 * 100; //%
        top = Math.round(top);
        var height = command9.height/978*100; //%
        height = Math.round(height)+1;//なぜか小さくなるのでちょっと盛る（＋２％）
        var width = command9.width/978*100; //%
        width = Math.round(width);
        var text = command.value;
        var computedStyle = getComputedStyle(command);
        var font = computedStyle.fontSize;
            // var string_font = font.toString();
            // var length = string_font.length;
            // var size = length.subString(0,(length-2));
            // var numeric_size = parseFloat(size);
            // font = numeric_size * 1.5 + "px";
        code_command += (templete_command_a + left + templete_command_b + top + templete_command_c + width + templete_command_d + height + templete_command_e + font + templete_command_f + text + templete_command_g); 
        result_code+=code_command;
        }
    }
}

//ラジオボタンコード生成**********************************************************************************************

//グループ１

var templete_radio1_a = `       <input type="radio" id="" name="radio1" style="position: absolute; left:`;
var templete_radio1_b = `%; top:`;
var templete_radio1_f = `%" value="`;
var templete_radio1_g = `">
            <label style="position: absolute; left:`;
var templete_radio1_h = `%; top:`;
var templete_radio1_k = `%; font-size:`; 
var templete_radio1_l = `">`;
var templete_radio1_m = `</label>
`; 

function create_radio1(){
    if(document.getElementById('radio1_1')){
    result_code += `    <form>
`;
    for(var i = 1; i <= 8; i++){
        if(document.getElementById('radio1_'+i)){
        var code_radio = "";
        var radio = document.getElementById('radio1_'+i);
        var area = document.getElementById('edit_area_header');
        var radio9=radio.getBoundingClientRect();
        var area9=area.getBoundingClientRect();
        var left = (radio9.left-area9.left)/978 * 100; //%
        left = Math.round(left);
        left_label=left + 2;
        var top = (radio9.top-area9.top)/550 * 100; //%
        top = Math.round(top);
        var height = radio9.height/978*100; //%
        height = Math.round(height);
        var width = radio9.width/978*100; //%
        width = Math.round(width);
        var text = radio.value;
        var computedStyle = getComputedStyle(radio);
        var font = computedStyle.fontSize;
        code_radio += (templete_radio1_a + left + templete_radio1_b + top + templete_radio1_f + i + templete_radio1_g + left_label + templete_radio1_h + top + templete_radio1_k + font + templete_radio1_l + text + templete_radio1_m); 
        result_code+=code_radio;
        }
    }
    result_code += `    </form>
    `;
    }
}

//グループ２

var templete_radio2_a = `       <input type="radio" id="" name="radio2" style="position: absolute; left:`;
var templete_radio2_b = `%; top:`;
var templete_radio2_f = `%" value="`;
var templete_radio2_g = `">
            <label style="position: absolute; left:`;
var templete_radio2_h = `%; top:`;
var templete_radio2_k = `%; font-size:`; 
var templete_radio2_l = `">`;
var templete_radio2_m = `</label>
`; 

function create_radio2(){
    if(document.getElementById('radio2_1')){
    result_code += `    <form>
`;
    for(var i = 1; i <= 8; i++){
        if(document.getElementById('radio2_'+i)){
        var code_radio = "";
        var radio = document.getElementById('radio2_'+i);
        var area = document.getElementById('edit_area_header');
        var radio9=radio.getBoundingClientRect();
        var area9=area.getBoundingClientRect();
        var left = (radio9.left-area9.left)/978 * 100; //%
        left = Math.round(left);
        left_label=left + 2;
        var top = (radio9.top-area9.top)/550 * 100; //%
        top = Math.round(top);
        var height = radio9.height/978*100; //%
        height = Math.round(height);
        var width = radio9.width/978*100; //%
        width = Math.round(width);
        var text = radio.value;
        var computedStyle = getComputedStyle(radio);
        var font = computedStyle.fontSize;
        code_radio += (templete_radio2_a + left + templete_radio2_b + top + templete_radio2_f + i + templete_radio2_g + left_label + templete_radio2_h + top + templete_radio2_k + font + templete_radio2_l + text + templete_radio2_m); 
        result_code+=code_radio;
        }
    }
    result_code += `    </form>
    `;
    }
}

//グループ３

var templete_radio3_a = `       <input type="radio" id="" name="radio3" style="position: absolute; left:`;
var templete_radio3_b = `%; top:`;
var templete_radio3_f = `%" value="`;
var templete_radio3_g = `">
            <label style="position: absolute; left:`;
var templete_radio3_h = `%; top:`;
var templete_radio3_k = `%; font-size:`; 
var templete_radio3_l = `">`;
var templete_radio3_m = `</label>
`; 

function create_radio3(){
    if(document.getElementById('radio3_1')){
    result_code += `    <form>
`;
    for(var i = 1; i <= 8; i++){
        if(document.getElementById('radio3_'+i)){
        var code_radio = "";
        var radio = document.getElementById('radio3_'+i);
        var area = document.getElementById('edit_area_header');
        var radio9=radio.getBoundingClientRect();
        var area9=area.getBoundingClientRect();
        var left = (radio9.left-area9.left)/978 * 100; //%
        left = Math.round(left);
        left_label=left + 2;
        var top = (radio9.top-area9.top)/550 * 100; //%
        top = Math.round(top);
        var height = radio9.height/978*100; //%
        height = Math.round(height);
        var width = radio9.width/978*100; //%
        width = Math.round(width);
        var text = radio.value;
        var computedStyle = getComputedStyle(radio);
        var font = computedStyle.fontSize;
        code_radio += (templete_radio3_a + left + templete_radio3_b + top + templete_radio3_f + i + templete_radio3_g + left_label + templete_radio3_h + top + templete_radio3_k + font + templete_radio3_l + text + templete_radio3_m); 
        result_code+=code_radio;
        }
    }
    result_code += `    </form>
    `;
    }
}

//グループ４

var templete_radio4_a = `       <input type="radio" id="" name="radio4" style="position: absolute; left:`;
var templete_radio4_b = `%; top:`;
var templete_radio4_f = `%" value="`;
var templete_radio4_g = `">
            <label style="position: absolute; left:`;
var templete_radio4_h = `%; top:`;
var templete_radio4_k = `%; font-size:`; 
var templete_radio4_l = `">`;
var templete_radio4_m = `</label>
`; 

function create_radio4(){
    if(document.getElementById('radio4_1')){
    result_code += `    <form>
`;
    for(var i = 1; i <= 8; i++){
        if(document.getElementById('radio4_'+i)){
        var code_radio = "";
        var radio = document.getElementById('radio4_'+i);
        var area = document.getElementById('edit_area_header');
        var radio9=radio.getBoundingClientRect();
        var area9=area.getBoundingClientRect();
        var left = (radio9.left-area9.left)/978 * 100; //%
        left = Math.round(left);
        left_label=left + 2;
        var top = (radio9.top-area9.top)/550 * 100; //%
        top = Math.round(top);
        var height = radio9.height/978*100; //%
        height = Math.round(height);
        var width = radio9.width/978*100; //%
        width = Math.round(width);
        var text = radio.value;
        var computedStyle = getComputedStyle(radio);
        var font = computedStyle.fontSize;
        code_radio += (templete_radio4_a + left + templete_radio4_b + top + templete_radio4_f + i + templete_radio4_g + left_label + templete_radio4_h + top + templete_radio4_k + font + templete_radio4_l + text + templete_radio4_m); 
        result_code+=code_radio;
        }
    }
    result_code += `    </form>
    `;
    }
};

//明細コード生成**********************************************************************************************

//テーブル１

//テーブルのwidthとheightを取得
var table1_width = 0;
    var table1_width_percent = 0;
var table1_height = 0;
    var table1_height_percent = 0;

function sum_width_table1(){
    if(document.getElementById('table1_th1')){
        table1_width=0;
        table1_width_percent=0;
        for(var i = 1; i <= 6; i++){
            if(document.getElementById("table1_th"+i)){
                var th = document.getElementById("table1_th"+i);
                var rect = th.getBoundingClientRect();
                table1_width += rect.width;
            }
        }
        table1_width_percent = table1_width/978*100;
        table1_width_percent = Math.round(table1_width_percent);
    }
}

function sum_height_table1(){
    if(document.getElementById('table1_th1')){
        table1_height = 0;
        table1_height_percent = 0;
        var th1 = document.getElementById('table1_th1');
        var th1_rect = th1.getBoundingClientRect();
        table1_height += th1_rect.height;
        for(var i = 1; i <= 8; i++){
            if(document.getElementById("table1_th1_row"+i)){
                var td = document.getElementById("table1_th1_row"+i);
                var rect = td.getBoundingClientRect();
                table1_height += rect.height;
            }
        }
        table1_height_percent = table1_height/550*100;
        table1_height_percent = Math.round(table1_height_percent);
    }
}

//th
var templete_th_a = `
    <th style="width:`;
var templete_th_b = `%; height:`; 
var templete_th_c = `%; font-size:`; 
var templete_th_d = `">`; 
var templete_th_e = `</th>`; 

//td
var templete_td_a = `
    <td style="width:`;
var templete_td_b = `%; font-size:`; 
var templete_td_c = `">`; 
var templete_td_d = `</td>`; 

//関数
function create_table(){
    sum_width_table1();
    sum_height_table1();
    create_table1();
}

function create_table1(){
    //スタイルを追加
    if(document.getElementById('table1_th1')){
        result_code += `
<style>
    table, th, td {
        border: 1px solid black;
        border-collapse: collapse;
    }
    th, td {
        padding: 10px;
    }
    th{
        text-decoration: underline;
    }
</style>
`;
        //変数定義
        var code_table = "";
        var code_th = "";
        var code_td = "";
        var code_td_td = "";
        var area = document.getElementById('edit_area_header');
        var area9=area.getBoundingClientRect();
        //th1のHeight
        var th1_aaa = document.getElementById('table1_th1');
        var rect_th1_aaa = th1_aaa.getBoundingClientRect();
        var th1_height = rect_th1_aaa.height;
        th1_height = th1_height/550*100;//%
        th1_height = Math.round(th1_height);

        //theadを作成 ok!*****
        var th1 = document.getElementById('table1_th1');//左上のth（座標設定用）
        var rect_th1 = th1.getBoundingClientRect();
        var th1_left = (rect_th1.left-area9.left)/978 * 100; //%
        th1_left = Math.round(th1_left);
        var th1_top = (rect_th1.top-area9.top)/550 * 100; //%
        th1_top = Math.round(th1_top);
        for(var i = 1; i <= 6; i++){//ヘッダー番号 i
            if(document.getElementById("table1_th"+i)){
                const th = document.getElementById("table"+1+"_th"+i);
                var rect_th=th.getBoundingClientRect();
                var width = rect_th.width/978*100; //width　%
                width = Math.round(width);
                var text = th.value;//テキスト内容
                var computedStyle = getComputedStyle(th);
                var font = computedStyle.fontSize;//フォントサイズ
                code_th += (templete_th_a + width + templete_th_b + th1_height + templete_th_c + font + templete_th_d + text + templete_th_e);
            }
        }
        code_table+=(`
<thead>` + code_th + `
</thead>`);
        // alert(code_table);

        //tbodyを作成*****
        var row = count_row_map.get(1);
        for(var a = 1; a <= row; a++){ //×行数
            code_td = "";
            for(var b = 1; b <= 6; b++){
                if(document.getElementById("table1_th"+b+"_row"+a)){
                    const td = document.getElementById("table1_th"+b+"_row"+a);
                    var rect_td=td.getBoundingClientRect();
                    var width = rect_td.width/978*100; //width　%
                    width = Math.round(width);
                    var text = td.value;//テキスト内容
                    var computedStyle = getComputedStyle(td);
                    var font = computedStyle.fontSize;//フォントサイズ
                    code_td += (templete_td_a + width + templete_td_b + font + templete_td_c + text + templete_td_d);
                }
            }
            //左rowのHeight
            var td1_aaa = document.getElementById("table1_th1_row"+a);
            var rect_td1_aaa = td1_aaa.getBoundingClientRect();
            var td1_height = rect_td1_aaa.height;
            td1_height = td1_height/550*100;//%
            td1_height = Math.round(td1_height);

            code_td_td += `<tr style="height:`+td1_height+`%">`+code_td+`
</tr>
`;
        }
        code_table += `
<tbody>
`+code_td_td+`
</tbody>`;
        result_code += (`<table style = "position:absolute; top:`+th1_top+`%; left:`+th1_left+`%; width:`+table1_width_percent+`%; height:`+table1_height_percent+`%">`+code_table+`
</table>`);
    }
}





//preview押下時処理*****************************************************************************************
function preview(){
    const newWindow = window.open('preview.html', '_blank', `width=${screen.width},height=${screen.height},top=0,left=0`);
    newWindow.onload = function() {
        newWindow.postMessage(result_code, '*');
    };
    
    
}
