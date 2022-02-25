import { IGatsbyImageData } from 'gatsby-plugin-image'

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
    contentfulid?:string;
    authorEmail:string;
    authorName:string;
    dateOfBirth:string;
    userImage:GatsbyImageData
    authorDescription?:{
        raw:string
    }

}

export interface PageQueryArticles{
    contentfulid?:string;
    category:string;
    date:string;
    title:string;
    subtitle:string;
    url:string;
    allImageSharp:GastsbyImgNode;
    img:GatsbyImageData
    article?:{
        raw:string
    }
    tags:{
        tags:string[]
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
    contentfulid:any;
    url:string;
}
export interface CreatePagesNodePerson {
    contentfulid:string;
    authorName:string;

}

export interface  FormDataStateCalendar {
    start?:{
        dateTime:string;
        timeZone:string;
      },
    end?:{
        dateTime:string;
        timeZone:string;
      },
      summary?:string,
      description?:string;
}

export interface SearchNode{
    allContentfulArticles:{
        nodes:NavbarMatchesState[]
    }
}

export interface NavbarMatchesState {
    title:string;
    url:string;
}

export interface PageQueryImagesAboutUs {
    data:{
        allImageSharp:{
            nodes:GastsbyImgNode[]
        }
    }
}

export interface GastsbyImgNode{
    gatsbyImageData:IGatsbyImageData
    fluid:{
        originalName:string;
    }
}


export interface AxiosOptions {
    method:any;
    url:string;
    data:FormDataStateCalendar;
    headers:{
        "Content-Type":string;
    }
}