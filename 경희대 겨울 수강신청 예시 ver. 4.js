javascript: (function () {

    var ui_nodelink = document.getElementById("Main").contentDocument.getElementById("coreMain").contentDocument.getElementById("coreMain").contentDocument.getElementsByTagName('head')[0].body;
    var script_nodelink = document.getElementById("Main").contentDocument.getElementById("coreMain").contentDocument.getElementById("coreMain").contentDocument.getElementsByTagName('head')[0];
    let codeList = ['GEC0103-G00', 'GEC1102-G17', 'GEC1105-G34', 'GED1419-G01'];/*과목코드를 여기에 적어주세요*/
    let p_major = "A05368";/*전공 코드*/
    let p_year = "2020";/*년도*/
    let p_term = "20";/*1학기면 10 2학기면 20, 여름계절학기는 15, 겨울계절학기는 20*/
    var script_node = document.createElement('script');
    var script_text = document.createTextNode(` 
    /*이 소스코드 아래부터 수정해주세요*/
    window.clickcount=0;
    function sugang_start(){
    try{
        fnLoad(urlSugangMain,'this');
    }catch(e){
        window.clickcount++;
        document.getElementById("start_bt").value = "재시도&#13;(수강신청기간이 아닙니다.)&#13클릭횟수;"+window.clickcount;
    }
        for(let lecture_count=0; lecture_count<8; lecture_count++){
            if(document.getElementsByClassName('lecture_list')[lecture_count].value.length>0){
    try{
                $.ajax({
                    url : encodeURI("/core?attribute=lectListJson&lang=ko&fake=1582665436723&menu=1&search_div=S&p_day=&p_time=&p_teach=&p_subjt=&p_major=${p_major}&p_lang=&p_year=${p_year}&p_term=${p_term}&lecture_cd="+document.getElementsByClassName('lecture_list')[lecture_count].value+"&initYn=Y"),
                    dataType:"JSON",
                    success : function(result) {
            console.log("가져온 값 과목id값"+result.rows[0].params);
            if(typeof(result.rows[0].params)!==undefined){
                                sugang_run(result.rows[0].params,lecture_count);
            }
                    },
                    async: false
                 });
    }catch(e){
        console.log(e);
        console.log("과목코드"+lecture_count+"에러(과목코드란은 0번부터 시작합니다. 유의)"+document.getElementsByClassName('lecture_list')[lecture_count].value);
        document.getElementsByClassName('lecture_list')[lecture_count].setAttribute("style","color:red;height:25px;");
    } 
            }
        }
    }
    
    function sugang_run(params,lecture_count){
        var mode = "insert";
        var retake_yn = "N";
        var reSugang_key="";
        var ticket="";
        $.ajax({
            type: "POST",
            url: "/sugang?attribute=sugangMode&lang=ko&fake=1582665607611" +"&mode="+mode+"&fake="+Date.now(),
            data:{params: params, retake_yn:retake_yn, reSugang_key:reSugang_key, ticket:ticket},
            async:false,
            success: function(data) {
                var tmp = eval("("+data+")");
                var code = tmp.code;
                var msg  = tmp.msg;
                
                if(code == "511"){
                    logout(msg);
                }else if(code == "MACRO"){	
                    macroChk(params, rowid, mode, msg);
                }else if(code == "201" || code == "301"){
                    if(confirm("이미 이수한 과목입니다학점 재수강 신청을 원하시면 확인을, 아니면 취소를 선택하세요!!재수강시 기취득한 성적은 삭제됩니다.")){
                        reTake(params, rowid, code);
                    }
                }else if(code == "200"){
                    if(mode == 'insert'){
                        console.log(document.getElementsByClassName('lecture_list')[lecture_count].value+tmp.msg+params);
                        document.getElementsByClassName('lecture_list')[lecture_count].setAttribute("style","color:green; height:20px;");
                    }else{
                        console.log(document.getElementsByClassName('lecture_list')[lecture_count].value+msg+params);
                    }
                }else{
                    console.log(document.getElementsByClassName('lecture_list')[lecture_count].value+tmp.msg+params);
                    return;
                }		
            },
            error: function(req, status, error){
                alert("message:"+req.responseText);
            }
        });
    }
    
    /*본문에 노드를 삽입해야하니 이 소스코드 위까지만 수정해주세요*/
    `);
    script_node.appendChild(script_text);
    script_nodelink.appendChild(script_node);

    try {
        for (i = 0; i < 8; i++) {
            let nodetype = document.createElement('input');
            nodetype.setAttribute("type", "text");
            nodetype.setAttribute("class", "lecture_list");
            nodetype.setAttribute("placeholder", "코드입력" + i);
            nodetype.setAttribute("style", "height:20px; margin:0px; padding:0px");
            let nodetext = document.createTextNode(` `);
            nodetype.appendChild(nodetext);
            $("div.wrap-menu>ul")[0].appendChild(nodetype);
        }
    } catch (e) {
        try {
            for (i = 0; i < 8; i++) {
                let nodetype = document.createElement('input');
                nodetype.setAttribute("type", "text");
                nodetype.setAttribute("class", "lecture_list");
                nodetype.setAttribute("placeholder", "코드입력" + i);
                nodetype.setAttribute("style", "height:20px; margin:0px; padding:0px");
                let nodetext = document.createTextNode(` `);
                nodetype.appendChild(nodetext);
                ui_nodelink.appendChild(nodetype);
            }
        } catch (e) {
            ui_nodelink = document.getElementById("Main").contentDocument.getElementById("coreMain").contentDocument.getElementById("coreMain").contentDocument.getElementsByClassName("nav")[0].getElementsByClassName('wrap-menu')[0].getElementsByTagName("ul")[0];
            for (i = 0; i < 8; i++) {
                let nodetype = document.createElement('input');
                nodetype.setAttribute("type", "text");
                nodetype.setAttribute("class", "lecture_list");
                nodetype.setAttribute("placeholder", "코드입력" + i);
                nodetype.setAttribute("style", "height:20px; margin:0px; padding:0px");
                let nodetext = document.createTextNode(` `);
                nodetype.appendChild(nodetext);
                ui_nodelink.appendChild(nodetype);
            }
        }
    } finally {
        alert("\t<2020학년도 2학기 경희대학교 수강신청>\※사용법\n좌측하단 코드입력에 과목코드를 미리 입력해놓습니다. 수강신청을 원하면 시작버튼을 눌러주세요. \n 수강신청기간이 아니면 동작하지 않습니다. \n\n※주의사항(반드시 전부 읽을것)\n-수강코드에 띄어쓰기가 섞이면 에러가 발생합니다.\n-0번부터 차례대로 입력합니다.\n-빨간색으로 칠해지는 과목코드는 신청에 실패한것이니 확인해주세요.\n\n\n #beta_version_1.0");
        Array.from(codeList).forEach(function (value, index) {
            ui_nodelink.getElementsByClassName('lecture_list')[index].value = value;
        })
    }
    let bt_start = document.createElement('button');
    bt_start.setAttribute("id", "start_bt");
    bt_start.setAttribute("style", "color:black;height:40px; width:100%; font-size:13px;");
    bt_start.setAttribute("onclick", " sugang_start(); ");
    let start_text = document.createTextNode(`시작`);
    bt_start.appendChild(start_text);
    ui_nodelink.appendChild(bt_start);

    let bt_test = document.createElement('button');
    bt_test.setAttribute("id", "start_bt");
    bt_test.setAttribute("style", "color:black;height:20px; width:100%; font-size:13px;");
    bt_test.setAttribute("onclick", " test_start(); ");
    let test_text = document.createTextNode(`테스트`);
    bt_test.appendChild(test_text);
    ui_nodelink.appendChild(bt_test);

})();
