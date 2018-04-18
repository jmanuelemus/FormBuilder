class WebForm {

    constructor(mame = '') {
        this.name  = name;
        this.pages = new Array();
    }

    add(el) {

        if (el instanceof Page)
            return this.addPage(el);

        else {

            if (this.pages.length == 0)
                this.add(new Page());

            return this.pages[0].add(el);
        }
    }

    addPage(el) {
        return this.pages.push(el);
    }

    page(id) {
        
        if (typeof id == 'number')
            return this.pages[id];

        else {

            var obj;

            this.pages.forEach(function(el) {
                if (!obj && el.name == id) obj = el;
            
            }); return obj;
        }
    }

    section(id) {
        var obj;
        
        if (typeof id == 'number') {

            this.pages.forEach(function(el) {
                
                if (!obj) {

                    if (id < el.sections.length)
                        obj = el.section(id);
                    else
                        id -= el.sections.length;
                }

            }); return obj; 

        } else {

            var section;

            this.pages.forEach(function(el) {
                if (!obj && (section = el.section(id))) obj = section;
            
            }); return obj;
        }
    }
}

class Page {

    constructor(name = '') {
        this.name     = name;
        this.sections = new Array();
    }

    add(el) {

        if (el instanceof Section)
            return this.addSection(el);

        else {

            if (this.sections.length == 0)
                this.add(new Section());

            return this.sections[0].add(el);
        }
    }

    addSection(el) {
        return this.sections.push(el);
    }

    section(id) {
    
        if (typeof id == 'number')
            return this.sections[id];

        else {

            var obj;

            this.sections.forEach(function(el) {
                if (!obj && el.name == id) obj = el;
            
            }); return obj;
        }
    }
}

class Section {

    constructor(name = '') {
        this.name        = name;
        this.subSections = new Array();
    }

    add(el) {

        if (el instanceof SubSection)
            return this.addSubSection(el);

        else {

            if (this.subSections.length == 0)
                this.add(new SubSection());

            return this.subSections[0].add(el);
        }
    }

    addSubSection(el) {
        return this.subSections.push(el);
    }

    subSection(id) {
        // TODO
    }
}

class SubSection {

    constructor() {
        this.name = name;
        this.rows = new Array();
    }

    add(el) {

        if (el instanceof Row)
            return this.addRow(el);
        
        else {

            if (this.rows.length == 0 || el instanceof Input)
                this.add(new Row());

            if (el instanceof Input)
                return this.rows[this.rows.length - 1].add(el);

            return this.rows[0].add(el);
        }
    }

    addRow(el) {
        return this.rows.push(el);
    }

    row(id) {
        // TODO
    }
}

class Row {

    constructor() {
        this.columns = new Array();
    }

    add(el) {

        if (el instanceof Column)
            return this.addColumn(el);

        else {

            if (this.columns.length == 0)
                this.add(new Column());

            return this.columns[0].add(el);
        }
    }

    addColumn(el) {
        return this.columns.push(el);
    }

    column(id) {
        // TODO
    }
}

class Column {

    constructor() {
        this.inputs = new Array();
    }

    add(el) {

        if (el instanceof Input)
            return this.addInput(el);
        else
            return false;
    }

    addInput(el) {
        return this.inputs.push(el);
    }

    input(id) {
        // TODO
    }
}

class Input {

    constructor(name = '') {
        this.name = name;
    }
}