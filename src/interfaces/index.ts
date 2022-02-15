
export interface ImageSources {
    sizes:string;
    srcSet:string;
    type:string;
}

export interface GatsbyImageData{
    height:number;
    width:number;
    layout:number;
    images:{
        sources:ImageSources[]
    }
    placeholder:{
        fallback:string;
    }
}


export interface Author {
    id:string;
    authorEmail:string;
    authorName:string;
    dateOfBirth:string;
    userImage:GatsbyImageData

}

export interface PageQuery{
    id:string;
    category:string;
    date:string;
    title:string;
    subtitle:string;
    url:string;
    img:GatsbyImageData
    author:Author
}

export interface PageQueryArr {
    data:{
        allContentfulArticles:{
            nodes:PageQuery[]
        }
    }
}


export interface CreatePagesNode {
    id:string;
    contentfulid:string;
    url:string;
}