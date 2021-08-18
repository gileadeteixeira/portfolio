const tools = require('../../databases/tools.json').tools;

const sortTools = {
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

const editTools = {
    loadAllTools : ()=>{
        return tools.map(tool=>{
            return editTools.setLongDate(tool);
        })
    },

    setMainDate : (tool)=>{
        let mainDate = null;
        if (tool.advance != null) {mainDate = tool.advance}
        else if (tool.start != null) {mainDate = tool.start};
        return mainDate != null ? {...tool, mainDate: new Date(Date.parse(mainDate))} : null;
    },

    setNotNull : (tool)=>{
        if (tool != null) {
            return tool.mainDate != null;
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
                let date1 = new Date(toolA.mainDate);
                let date2 = new Date(toolB.mainDate);
                result = sortType(date1, date2);
                break;
            default:
                break;
        };
        return result;
    },

    setLongDate : (tool)=>{
        if (tool.mainDate!=null) {
            longDate = new Date(Date.parse(tool.mainDate)).toLocaleString('pt-BR',{dateStyle: 'long'});
            tool.mainDate = longDate;
        }
        return tool;
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

/*console.log(
    editTools.myTools(sortTools.byDecreasingEvolution)
    //editTools.loadAllTools()
);*/