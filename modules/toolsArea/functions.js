import {tools} from '../../databases/tools.js'

//const tools = require('../../databases/tools.json').tools;

export const sortTools = {
    byGrowingAlphabetical : ()=>{//A-Z
        return 1;
    },

    byDecreasingAlphabetical : ()=>{//Z-A
        return -1;
    },

    byGrowingEvolution : (first, second)=>{//mais antiga primeiro
        return first - second;
    },

    byDecreasingEvolution : (first, second)=>{//mais recente primeiro
        return second - first;
    }
}

export const editTools = {
    loadAllTools : ()=>{
        return tools.map(tool=>{
            return editTools.setLongDate(tool);
        })
    },

    setMainDate : (tool)=>{
        let mainDate = null;
        if (tool.advance != null) {mainDate = tool.advance}
        else if (tool.start != null) {mainDate = tool.start};
        return mainDate != null ? {...tool, mainDate: new Date(mainDate)} : {...tool, mainDate: null};
    },

    setNotNull : (tool)=>{
        if (tool != null) {
            return tool.start != null;
        };
    },

    filterBy : (tool, key, value)=>{
        if (tool != null) {
            return tool[key] == value;
        };
        /*
        Keys:
            type: "framework"; "server"; "text editor"; "cloud"; "programming language"; "stylesheet language"; "software"; "markup language"; "library"; "data-interchange language" "software compilation";

            stack: null; "front-end"; "back-end"; "full-stack";

            area: null; "web"; "mobile"; "desktop"; "logic"; "multi-platform", "server", "package manager".

            status: null; "utilizada"; "aprofundada"
        */
    },
    
    setSort : (toolA, toolB, sortType)=>{
        let result = null;
        let type = sortType.name.replace(/byGrowing|byDecreasing/gmi, '').toLowerCase();
        switch (type) {
            case "alphabetical":
                result = sortType();
                break;
            case "evolution":
                let date1 = toolA.advance != null ? new Date(toolA.advance) : new Date(toolA.start);
                let date2 = toolB.advance != null ? new Date(toolB.advance) : new Date(toolB.start);
                result = sortType(date1, date2);
                break;
            default:
                break;
        };
        return result;
    },

    setLongDate : (tool)=>{
        let tollEdited  = editTools.setMainDate(tool);
        if (tollEdited.mainDate!=null) {
            longDate = tollEdited.mainDate.toLocaleString('pt-BR',{dateStyle: 'long'});
            tollEdited.mainDate = longDate;
        }
        return tollEdited;
    },

    myTools : (sortType = sortTools.byGrowingAlphabetical) =>{//default A-Z
        return tools
        .filter(tool =>{
            return editTools.setNotNull(tool);
        })
        .sort((toolA,toolB)=>{
            return editTools.setSort(toolA,toolB,sortType);
        })
        .map(tool=>{
            return editTools.setLongDate(tool);
        });
    }
}

/*console.table(
    editTools.myTools(sortTools.byDecreasingEvolution)
    //editTools.loadAllTools()
);*/