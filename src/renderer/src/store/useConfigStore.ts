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
    saveDirectory:string,
    tagData:Tag[],
    myTag:Tag[], // 确保 myTag 是一个 Tag 数组
}

export const useConfigStore = defineStore('config',()=>{
    const config = ref<Config>({
        url:'',
        saveDirectory:'',
        tagData:[],
        myTag:[]
    })
    return {
        config
    }
},{persist:true})