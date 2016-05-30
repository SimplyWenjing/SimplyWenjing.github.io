var questionBtn = document.getElementById("Q-btn");
var show_tip = document.getElementById("user-risk");
function getRank(){
    var parts = [];
    var score = 0;
    var form = document.forms[0];
    for (var i = 0; i < form.elements.length; i++) {
        var field = form.elements[i];
        field.flag=0;
        if (field.name.length) {
            if (field.checked) {field.flag=1;
                parts.push(field.value);
            }
        }
    }
    problem=[0,0,0,0,0,0,0];
    for(var n=0;n<form.elements.length;n++){
        var p=Math.floor(n/5);
        if(p==0){
            problem[p]+=form.elements[n].flag;
        }else if(p==1){
            problem[p]+=form.elements[n].flag;
        }else if(p==2){
            problem[p]+=form.elements[n].flag;
        }else if(p==3){
            problem[p]+=form.elements[n].flag;
        }else if(p==4){
            problem[p]+=form.elements[n].flag;
        }else if(p==5){
            problem[p]+=form.elements[n].flag;
        }else if(p==6){
            problem[p]+=form.elements[n].flag;
        }
    }
    for(var x=0;x<7;x++){
        if(problem[x]==0){
            var y=x+1;
            alert("问卷问题"+y+"未填写");
        }
    }

    var result=parts.map(function(item,index,array){
        /*console.log(item);*/
        switch (item){
            case "A" : return item = 10;
            case "B" : return item = 8;
            case "C" : return item = 5;
            case "D" : return item = 3;
            case "E" : return item = 0;
        }
    });
    for (var i = 0; i < result.length; i++) {
        score+=parseInt(result[i]);
    };
    return score;
}
questionBtn.addEventListener("click",function(event){
    event.preventDefault();
    var score = getRank();
    show_tip.style.display = "block";
    var result = document.getElementById("result");
    if ( 0 < score && score <= 15) {
        var html = "";
        var span = "得分："+score+";保守型——低风险级别产品";
        var p = "您的风险承担能力水平比较低，您关注资产的安全性远超于资产的收益性，所以低风险 、高流动性的投资品种比较适合您，这类投资的收益相对偏低。"
        html +="<span class='user-risk-span'>" + span + "<\/span>";
        html +="<p class='user-risk-p'>" + p + "<\/p>";
        result.innerHTML = html;
    } else if( 15 < score && score <= 30 ){
        var html = "";
        var span = "得分："+score+";稳健型——较低风险级别产品";
        var p = "您有比较有限的风险承受能力，对投资收益比较敏感，期望通过短期、持续、渐进的投资获得高于定期存款的回报。所以较低等级风险的产品如保本保息的固定收益类，比较适合您，适当回避风险的同时保证收益，跑赢通胀。"
        html +="<span class='user-risk-span'>" + span + "<\/span>";
        html +="<p class='user-risk-p'>" + p + "<\/p>";
        result.innerHTML = html;
    } else if(30 < score && score <= 45){
        var html = "";
        var span = "得分："+score+";平衡型——中等风险级别产品";
        var p = "您有一定的风险承受能力，对投资收益比较敏感，期望通过长期且持续的投资获得高于平均水平的回报，通常更注重十年甚至更长期限内的平均收益。所以中等风险收益的投资品种比较适合您，回避风险的同时有一定的收益保证。"
        html +="<span class='user-risk-span'>" + span + "<\/span>";
        html +="<p class='user-risk-p'>" + p + "<\/p>";
        result.innerHTML = html;
    } else if(45 < score && score <=60){
        var html = "";
        var span = "得分："+score+";积极型——较高风险级别产品";
        var p = "您有中高的风险承受能力，愿意承担可预见的投资风险去获取更多的收益，一般倾向于进行中短期投资。所以中高等级的风险收益投资品种比较适合您，以一定的可预见风险换取超额收益。"
        html +="<span class='user-risk-span'>" + span + "<\/span>";
        html +="<p class='user-risk-p'>" + p + "<\/p>";
        result.innerHTML = html;
    } else if(60<score && score <70){
        var html = "";
        var span = "得分："+score+";激进型——高风险级别产品";
        var p = "您有较高的风险承受能力，是富有冒险精神的积极型选手。在投资收益波动的情况下，仍然保持积极进取的投资理念。短期内投资收益的下跌被您视为加注投资的利好机会。您适合从事灵活、风险与报酬都比较高的投资，不过要注意不要因一时的高报酬获利而将全部资金投入高风险操作，务必做好风险管理与资金调配工作。"
        html +="<span class='user-risk-span'>" + span + "<\/span>";
        html +="<p class='user-risk-p'>" + p + "<\/p>";
        result.innerHTML = html;
    }
},false);
var close = document.getElementById("risk-close");
close.addEventListener("click",function(){
    show_tip.style.display = "none";
},false);
var radio=document.getElementById("radio");
var duration=document.getElementById("duration");
var acceptance_level=document.getElementById("acceptance-level");
var radiopre_score=1,durationpre_score=1,acceptance_levelpre_score=1;
radio.onchange=function (){
    var radio_option=radio.options;
    var x=radio.selectedIndex;//下拉列表中被选项的索引号
    /*console.log(radio_option[x].index);*/
    if(radio_option[x].index==1){
        radiopre_score=0.2;
    }else if(radio_option[x].index==2){
        radiopre_score=0.5;
    }else if(radio_option[x].index==3){
        radiopre_score=0.7;
    }else if(radio_option[x].index==4){
        radiopre_score=0.8;
    }else if(radio_option[x].index==5){
        radiopre_score=0.9;
    }
}
duration.onchange=function (){
    var duration_option=duration.options;
    var x=duration.selectedIndex;//下拉列表中被选项的索引号
    /*	console.log(duration_option[x].index);*/
    if(duration_option[x].index==1){
        durationpre_score=0.9;
    }else if(duration_option[x].index==2){
        durationpre_score=0.7;
    }else if(duration_option[x].index==3){
        durationpre_score=0.5;
    }else if(duration_option[x].index==4){
        durationpre_score=0.4;
    }else if(duration_option[x].index==5){
        durationpre_score=0.2;
    }else if(duration_option[x].index==6){
        durationpre_score=0.1;
    }
}

acceptance_level.onchange=function (){
    var acceptance_level_option=acceptance_level.options;
    var x=acceptance_level.selectedIndex;//下拉列表中被选项的索引号
    /*	console.log(acceptance_level_option[x].index);*/
    if(acceptance_level_option[x].index==1){
        acceptance_levelpre_score=0.9;
    }else if(acceptance_level_option[x].index==2){
        acceptance_levelpre_score=0.7;
    }else if(acceptance_level_option[x].index==3){
        acceptance_levelpre_score=0.5;
    }else if(acceptance_level_option[x].index==4){
        acceptance_levelpre_score=0.3;
    }else if(acceptance_level_option[x].index==5){
        acceptance_levelpre_score=0.1;
    }
}

function getRankscore(value) {
    var getRank_score;
    if(value<=15){
        getRank_score = 0.9;
    }else if(value>15&&value<=30){
        getRank_score = 0.7;
    }else if(value>30&&value<=45){
        getRank_score= 0.5;
    }else if(value>45&&value<=60){
        getRank_score= 0.3;
    }else if(value>60){
        getRank_score= 0.1;
    }
    return getRank_score;
}

//创建对象数组
var platform=[
    {"platname":"翼龙贷-翼农计划", "vector":[0.8,0.9,0.2,0.7],"totalscore":0},
    {"platname":"陆金所-安盈票据", "vector":[0.7,0.7,0.2,0.8],"totalscore":0},
    {"platname":"链家理财-家多宝", "vector":[0.9,0.9,0.2,0.8],"totalscore":0},
    {"platname":"积木盒子-项目集", "vector":[0.7,0.9,0.2,0.8],"totalscore":0},
    {"platname":"有利网-定存宝", "vector":[0.7,0.7,0.5,0.7],"totalscore":0},
    {"platname":"宜人贷-宜定赢1", "vector":[0.7,0.9,0.5,0.7],"totalscore":0},
    {"platname":"陆金所-稳赢-安e", "vector":[0.8,0.9,0.2,0.7],"totalscore":0},
    {"platname":"开鑫贷-变现贷", "vector":[0.8,0.7,0.5,0.8],"totalscore":0},
    {"platname":"开鑫贷-保鑫汇", "vector":[0.6,0.2,0.5,0.8],"totalscore":0},
    {"platname":"有利网-月息通", "vector":[0.4,0.1,0.7,0.7],"totalscore":0},
    {"platname":"银客网-优房宝", "vector":[0.8,0.9,0.2,0.7],"totalscore":0},
    {"platname":"易贷网-债权质押借款", "vector":[0.7,0.9,0.7,0.8],"totalscore":0},
    {"platname":"宜人贷-宜定赢2", "vector":[0.4,0.2,0.7,0.7],"totalscore":0},
    {"platname":"小牛在线-安心牛", "vector":[0.5,0.7,0.7,0.4],"totalscore":0},
    {"platname":"微贷网-质押", "vector":[0.6,0.7,0.7,0.7],"totalscore":0},
    {"platname":"投哪网-年省心", "vector": [0.5,0.4,0.7,0.6],"totalscore":0},
    {"platname":"人人贷-资金周转", "vector":[0.5,0.4,0.7,0.9],"totalscore":0},
    {"platname":"ppmoney-懒人宝", "vector":[0.5,0.5,0.7,0.4],"totalscore":0},
    {"platname":"ppmoney-分期宝", "vector":[0.2,0.5,0.7,0.4],"totalscore":0},
    {"platname":"微贷网-大众CC抵押", "vector":[0.4,0.4,0.8,0.7],"totalscore":0},
    {"platname":"爱钱进-散标", "vector":[0.2,0.1,0.8,0.6],"totalscore":0},
    {"platname":"拍拍贷-个人借款", "vector":[0.2,0.4,0.9,0.7],"totalscore":0},
    {"platname":"陆金所-财富汇-产品", "vector":[0.1,0.1,0.9,0.8],"totalscore":0}
];

var submit=document.getElementById("recommend-btn");
var recommend_result=document.getElementById("recommend-result");
var show_result=document.getElementById("recommend_result");
var recommend_illustrate=document.getElementById("recommend_illustrate");
submit.onclick=function () {
        var html="<li>"+"<span>"+"排名"+"</span>"+"<span>"+"平台"+"</span>"+"<span>"+"总分"+"</span>"+"</li>";;
        if(radiopre_score==1){
            alert("投资收益率倾向未选择");
        }
        if(durationpre_score==1){
            alert("投资期限倾向未选择");
        }
        if(acceptance_levelpre_score==1){
            alert("听取舆论评价程度倾向未选择");
        }
        var questionnaire_score=getRankscore(getRank());//转换
        var arr=[questionnaire_score,durationpre_score,radiopre_score,acceptance_levelpre_score];

        function Array_2(nRow,nColumn){
            var array1=new Array(); //定义一维数组
            for(i=0;i<nRow;i++){
                //将每一个子元素又定义为数组
                array1[i]=new Array();
//----------------------------------------
                for(n=0;n<nColumn;n++){
                    array1[i][n] = ''; //此时aa[i][n]可以看作是一个二级数组
                }
//--------------------------------------
            }
            return array1;
        }
        var array_2= Array_2(23,2);
        var total=0;
        function check() {
            for(var s=0;s<7;s++){
                total=total+problem[s];
            }
            if(total==7&&radiopre_score!=1&&durationpre_score!=1&&acceptance_levelpre_score!=1){
                for(var i=0;i<platform.length;i++){
                    platform[i].totalscore=0;
                    for(var j=0;j<4;j++){
                        platform[i].totalscore+=platform[i].vector[j]*arr[j];
                    }
                    /*console.log(parseFloat(platform[i].totalscore));*/
                    array_2[i][0]=platform[i].totalscore;
                    array_2[i][1]=platform[i].platname;
                }
                for(var k=0;k<23;k++){
                    for(var l=0;l<23-k-1;l++){
                        if(array_2[l][0]<array_2[l+1][0])
                        {
                            var temp=array_2[l][0];
                            array_2[l][0]=array_2[l+1][0];
                            array_2[l+1][0]=temp;
                            var temp2=array_2[l][1];
                            array_2[l][1]=array_2[l+1][1];
                            array_2[l+1][1]=temp2;
                        }
                    }
                }

            }
            for(var i=0;i<6;i++) {
                var j=i+1;
                html+="<li>"+"<span>"+"TOP"+j+"</span>"+"<span>"+array_2[i][1]+"</span>"+"<span>"+array_2[i][0].toFixed(3)+"</span>"+"</li>";
            }
            recommend_result.innerHTML=html;
            recommend_illustrate.style.display="none";
            show_result.style.display="block";
        }
        check();

    }
