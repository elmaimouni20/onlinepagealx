export default async function CFetch (params){
    if(params.afterSuccess == undefined){
        console.error("CFetch: afterSuccess function is undefined");
        return
    }
    if(params.afterError == undefined){
        console.error("CFetch: afterError function is undefined");
        return
    }
    if(params.body != undefined){
        params.body = JSON.stringify(params.body);
        if(params.headers == undefined ){
            params.headers = {};
        }
        params.headers = {...params.headers , "Content-Type":"application/json"}
    }
    
    let {url,afterSuccess,afterFinally,afterError,...rest} = params;
    fetch(url,rest).then((res)=>res.json()).then((res)=>{
        if(res.status == 200){
            afterSuccess(res);
        }else{
            afterError(res);
        }
    }).catch((error)=>{
        console.log(error);
    }).finally(()=>{
        if(afterFinally != undefined){
            afterFinally();
        }
    })
}