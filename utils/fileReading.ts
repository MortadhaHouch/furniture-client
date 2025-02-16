export default function fileReading(file:File){
    return new Promise((res,rej)=>{
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.addEventListener("load",()=>{
            if(fileReader.result){
                res(fileReader.result)
            }
        })
        fileReader.addEventListener("error",(err)=>{
            rej(err)
        })
    })
}