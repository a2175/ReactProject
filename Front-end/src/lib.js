import React from 'react';

export function isset(variable) {
    return typeof(variable) !== "undefined" && variable !== null;
}

export function getParam() {
    var get = [];
    get = decodeURI(window.location.pathname).substring(1).split("/");

    var param = {};
    param.page_type = isset(get[0]) && get[0] !== '' ? get[0] : 'main';
    param.action = isset(get[1]) && get[1] !== '' ? get[1] : null;
    param.idx = isset(get[2]) && get[2] !== '' ? get[2] : null;
    param.page_num = isset(get[2]) && get[2] !== '' ? get[2] : 1;
    param.keyword = isset(get[3]) && get[3] !== '' ? get[3] : null;
    param.include_file = isset(param.action) ? param.action : param.page_type;
    return param;
}

export function gfn_isNull(str) {
    if (str === null) return true;
    if (str === "NaN") return true;
    if (new String(str).valueOf() === "undefined") return true;
    var chkStr = new String(str);
    if( chkStr.valueOf() === "undefined" ) return true;
    if (chkStr === null) return true;
    if (chkStr.toString().length === 0 ) return true;
    return false;
}

/*
divId : 페이징 태그가 그려질 div
pageIndx : 현재 페이지 위치가 저장될 input 태그 id
recordCount : 페이지당 레코드 수
totalCount : 전체 조회 건수
eventName : 페이징 하단의 숫자 등의 버튼이 클릭되었을 때 호출될 함수 이름
*/
var gfv_eventName = null;
var gfv_keyword = null;
export function gfn_renderPaging(params){
    var divId = params.divId; //페이징이 그려질 div id
    var totalCount = params.totalCount; //전체 조회 건수
    var currentIndex = params.pageIndex; //현재 위치
    gfv_eventName = params.eventName;
    gfv_keyword = params.keyword;

    if(gfn_isNull(currentIndex) === true){
        currentIndex = 1;
    }

    var recordCount = params.recordCount; //페이지당 레코드 수
    if(gfn_isNull(recordCount) === true){
        recordCount = 15;
    }

    var totalIndexCount = Math.ceil(totalCount / recordCount); // 전체 인덱스 수

    var preStr = "";
    var postStr = "";
    var str = "";

    var first = (parseInt((currentIndex-1) / 10) * 10) + 1;
    var last = (parseInt(totalIndexCount/10) < currentIndex/10) ? totalIndexCount%10 : 10;
    var prev = (parseInt((currentIndex-1)/10)*10) - 9 > 0 ? (parseInt((currentIndex-1)/10)*10) - 9 : 1;
    var next = (parseInt((currentIndex-1)/10)+1) * 10 + 1 < totalIndexCount ? (parseInt((currentIndex-1)/10)+1) * 10 + 1 : totalIndexCount;
    
    var result = [];

    if(totalIndexCount > 10){ //전체 인덱스가 10이 넘을 경우, 맨앞, 앞 태그 작성
        result.push(<span key="pre"> <a href='#this' className='pad_5' onClick={_movePage} page="1">{"[<<]"}</a>
                    <a href='#this' className='pad_5' onClick={_movePage} page={prev}>{"[<]"}</a> </span>);
    }
    else if(totalIndexCount <=10 && totalIndexCount > 1){ //전체 인덱스가 10보다 작을경우, 맨앞 태그 작성
        result.push(<span key="pre"><a href='#this' className='pad_5' onClick={_movePage} page="1">{"[<<]"}</a></span>);
    }

    for(var i=first; i<(first+last); i++){
        if(String(i) !== currentIndex){
            result.push(<span key={i}><a href='#this' className='pad_5' onClick={_movePage} page={i}>{i}</a></span>);
        }
        else{
            result.push(<span key={i}><b><a href='#this' className='pad_5' onClick={_movePage} page={i}>{i}</a></b></span>);
        }
    }

    if(totalIndexCount > 10){ //전체 인덱스가 10이 넘을 경우, 맨뒤, 뒤 태그 작성
        result.push(<span key="post"> <a href='#this' className='pad_5' onClick={_movePage} page={next}>[>]</a> 
                    <a href='#this' className='pad_5' onClick={_movePage} page={totalIndexCount}>[>>]</a> </span>);
    }
    else if(totalIndexCount <=10 && totalIndexCount > 1){ //전체 인덱스가 10보다 작을경우, 맨뒤 태그 작성
        result.push(<span key="post"><a href='#this' className='pad_5' onClick={_movePage} page={totalIndexCount}>[>>]</a></span>);
    }

    console.log(result)
    return result;
}

export function _movePage(e){
    var page = e.target.getAttribute('page');
    if(gfn_isNull(gfv_keyword)) {
        window.location.href = gfv_eventName+page;
    }
    else {
        window.location.href = gfv_eventName+page+"/"+gfv_keyword;
    }
}
