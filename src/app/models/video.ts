export class Video{
    constructor(
        public id:number,
        public url:string,
        public name:string,
        public season:string,
        public number:string,
        public type:string,
        public airdate:string,
        public airtime:string,
        public airstamp:string,
        public runtime:string,
        public image:string,
        public summary:string,
        public _links:any,
        public _embedded:any
    ){}
}