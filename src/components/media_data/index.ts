const MediaData = async (response: any[]): Promise<Array<{ href: string; img: string }>> => {
  return response.map(item => ({
    href: item.properties.Link.url,
    img: item.properties.Img.files[0].file.url
  }));
};

export { MediaData };
