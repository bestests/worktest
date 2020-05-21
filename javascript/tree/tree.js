class TreeMenu {
    constructor (dataObj) {
        this.dataObj = dataObj
    }

    get getData () {
        return this.dataObj
    }

    set setData (dataObj) {
        this.dataObj = dataObj
    }

    treeInit(targetEle) {
        targetEle.appendChild(this.createTreeEle(this.dataObj))
    }

    createTreeEle (data) {
        console.dir(data)

        let ulObj = document.createElement("ul")
        let frag  = document.createDocumentFragment();

        for(let [code, treeObj] of Object.entries(data)) {
            console.dir(treeObj)
            let liObj = document.createElement("li")

            liObj.innerText = treeObj.codeNm
            liObj.setAttribute("data-idx", code)

            let innerData = treeObj.codeList

            if(innerData) {
                
                let clzStr = "close"
                if(code === "*") {
                    clzStr = "open"
                    ulObj.classList.add("treeUl")
                }

                liObj.classList.add("code-parent")
                liObj.classList.add(clzStr)

                liObj.appendChild(this.createTreeEle(innerData))
            }

            liObj.onclick = this.liOnclickListener.bind(liObj)

            frag.appendChild(liObj)
        }

        ulObj.appendChild(frag)

        return ulObj
    }

    liOnclickListener (e) {
        e.stopPropagation()
        e.preventDefault()

        if(this.classList.contains("code-parent")) {
            this.classList.toggle("open")
            this.classList.toggle("close")
        }
    }
}
