import React from 'react';

export function isset(variable) {
    return typeof(variable) !== "undefined" && variable !== null;
}

export function gfn_isNull(str) {
    if (str === null) return true;
    if (str === "NaN") return true;
    if (typeof(str) === "undefined") return true;
    if (str.toString().length === 0 ) return true;
    return false;
}

export function gfn_renderPaging(params){
  var totalCount = params.totalCount; //전체 조회 건수
  var currentIndex = params.pageIndex; //현재 위치
  var eventName = params.moveEvent; //페이징 하단의 숫자 등의 버튼이 클릭되었을 때 호출될 함수 이름
  var recordCount = 15; //전체 조회 건수
  var result = [];

  if(gfn_isNull(currentIndex) === true){
      currentIndex = 1;
  }

  var totalIndexCount = Math.ceil(totalCount / recordCount); // 전체 인덱스 수

  var first = (parseInt((currentIndex-1) / 10) * 10) + 1;
  var last = (parseInt(totalIndexCount/10) < currentIndex/10) ? totalIndexCount%10 : 10;
  var prev = (parseInt((currentIndex-1)/10)*10) - 9 > 0 ? (parseInt((currentIndex-1)/10)*10) - 9 : 1;
  var next = (parseInt((currentIndex-1)/10)+1) * 10 + 1 < totalIndexCount ? (parseInt((currentIndex-1)/10)+1) * 10 + 1 : totalIndexCount;
  var key = 0;

  if(totalIndexCount > 10){ //전체 인덱스가 10이 넘을 경우, 맨앞, 앞 태그 작성
      result.push(<a key={key++} href='#this' className='pad_5' page='1' onClick={eventName}>{"[<<]"}</a>);
      result.push(<a key={key++} href='#this' className='pad_5' page={prev} onClick={eventName}>{"[<]"}</a>);
  }
  else if(totalIndexCount <=10 && totalIndexCount > 1){ //전체 인덱스가 10보다 작을경우, 맨앞 태그 작성
      result.push(<a key={key++} href='#this' className='pad_5' page='1' onClick={eventName}>{"[<<]"}</a>);
  }

  for(var i=first; i<(first+last); i++){
      if(String(i) !== currentIndex){
          result.push(<a key={key++} href='#this' className='pad_5' page={i} onClick={eventName}>{i}</a>);
      }
      else{
          result.push(<b key={key++}><a href='#this' className='pad_5' page={i} onClick={eventName}>{i}</a></b>);
      }
  }

  if(totalIndexCount > 10){ //전체 인덱스가 10이 넘을 경우, 맨뒤, 뒤 태그 작성
      result.push(<a key={key++} href='#this' className='pad_5' page={next} onClick={eventName}>{"[>]"}</a>);
      result.push(<a key={key++} href='#this' className='pad_5' page={totalIndexCount} onClick={eventName}>{"[>>]"}</a>);
  }
  else if(totalIndexCount <=10 && totalIndexCount > 1){ //전체 인덱스가 10보다 작을경우, 맨뒤 태그 작성
      result.push(<a key={key++} href='#this' className='pad_5' page={totalIndexCount} onClick={eventName}>{"[>>]"}</a>);
  }

  return result;
}
