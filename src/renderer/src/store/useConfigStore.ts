import { defineStore } from "pinia";
import { ref } from "vue";

export type Tag = {
    id:string,
    name:string,
    flag:boolean,
    size:number
}

export type Config = {
    url:string,
    isFirst:boolean,
    signature:string,
    saveDirectory:string,
    tagData:Tag[],
    currentPaperUrl:string
    myTag:Tag[], // 确保 myTag 是一个 Tag 数组
}

export const useConfigStore = defineStore('config',()=>{
    const config = ref<Config>({
        url:'',
        isFirst:true,
        signature:'红尘多烦扰，情爱多苦忧',
        saveDirectory:'',
        tagData:[],
        myTag:[],
        currentPaperUrl:''
    })
    return {
        config
    }
},{persist:true})