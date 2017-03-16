export class Video{
    id: number;
    userName: string;
    rating: number;
    ratingsAmount: number;
    title: string;
    path: string;
    screenshotPath: string;
    dateAdded: string;
    
}

export class VideosObj{
    videosArray: Array<Video>;
    pagesAmount: number;
    pageNum: number;
}