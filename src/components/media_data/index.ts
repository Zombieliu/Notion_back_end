

const MediaData  = async (response: any) =>{
    let MediaDataList = []
    for (let i = 0 ;i<response.length;i++){
        const List = {
            href:response[i].properties.Link.url,
            img:response[i].properties.Img.files[0].file.url
        }
        MediaDataList.push(List)
    }
    return MediaDataList
}

export {MediaData}
