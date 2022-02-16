
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
    id?:number;
    authorEmail:string;
    authorName:string;
    dateOfBirth:string;
    userImage:GatsbyImageData
    authorDescription?:{
        raw:string
    }

}

export interface PageQueryArticles{
    id?:string;
    category:string;
    date:string;
    title:string;
    subtitle:string;
    url:string;
    img:GatsbyImageData
    article?:{
        raw:string
    }
    author:Author
}

export interface PageQueryArticlesArr {
    data:{
        allContentfulArticles:{
            nodes:PageQueryArticles[]
        }
    }
}


export interface CreatePagesNodeArticle {
    id:string;
    contentfulid:number;
    url:string;
}
export interface CreatePagesNodePerson {
    contentfulid:string;
    authorName:string;

}