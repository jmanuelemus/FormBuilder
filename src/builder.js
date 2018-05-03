class FormBuilder
{
    constructor()
    {
        this.Toolbox = new Toolbox(); 

        this.Form    = new Form();
    }

    add(ctrl)
    {
        this.Form.add(ctrl);
    }
}

class Toolbox
{
    constructor()
    {
        this.controls = new Array();
    }

    add(ctrl)
    {
        if (ctrl instanceof Control)
            this.controls.push(ctrl);
        else 
            return false;
    }
}

class Control
{
    constructor(type, props)
    {
        this.properties = new Array();

        for (var i = 0; i < props.length; i++) 
            this.properties.push(new Property(props[i]));

        this.type = type;
    }
}

class Property
{
    constructor(args)
    {
        this.name = args.name; 

        this.type = args.type;
    }
}

class ArrayList
{
    constructor()
    {
        this.array = new Array();
    }

    get length()
    {
        return this.array.length;
    }

    add(el)
    {
        return this.array.push(el);
    }

    find(attrib, value)
    {
        for (var i = 0; i < this.array.length; i++) {
            var el = this.array[i];

            if (el[attrib] == value) 
                return el;
        }
    }

    get(i)
    {
        return this.array[i];
    }
}

class Form
{
    constructor()
    {
        this.Pages = new ArrayList();
    }

    add(ctrl)
    {
        if (ctrl instanceof Page)
            this.Pages.add(ctrl);

        else 
        {
            if (this.Pages.length == 0)
                this.Pages.add(new Page('Untitled Page'));

            this.page(0).add(ctrl);
        }
    }

    page(id)
    {
        return (typeof id == 'number') ? this.Pages.get(id) : this.Pages.find('name', id);
    }
}

class Page
{
    constructor(name = '')
    {
        this.Sections = new ArrayList();

        this.name = name;
    }

    add(ctrl)
    {
        if (ctrl instanceof Section)
            this.Sections.add(ctrl);

        else
        {
            if (this.Sections.length == 0)
                this.Sections.add(new Section('Unnamed Section'))

            this.section(0).add(ctrl);
        }
    }

    section(id)
    {
        return (typeof id == 'number') ? this.Sections.get(id) : this.Sections.find('name', id);
    }
}

class Section
{
    constructor(name = '')
    {
        this.Subsections = new ArrayList();

        this.name = name;
    }

    add(ctrl)
    {
        if (ctrl instanceof Subsection)
            this.Subsections.add(ctrl);

        else
        {
            if (this.Subsections.length == 0)
                this.Subsections.add(new Subsection());

            this.subsection(0).add(ctrl);
        }
    }

    subsection(i)
    {
        return this.Subsections.get(i);
    }
}

class Subsection
{
    constructor()
    {
        this.Rows = new ArrayList();
    }

    add(ctrl)
    {
        if (ctrl instanceof Row)
            this.Rows.add(ctrl);

        else
        {
            if (this.Rows.length == 0)
                this.Rows.add(new Row());

            this.row(0).add(ctrl);
        }
    }

    row(i)
    {
        return this.Rows.get(i);
    }
}

class Row
{
    constructor()
    {
        this.Columns = new ArrayList();
    }

    add(ctrl)
    {
        if (ctrl instanceof Column)
            this.Columns.add(ctrl);

        else
        {
            if (this.Columns.length == 0)
                this.Columns.add(new Column());

            this.column(0).add(ctrl);
        }
    }

    column(i)
    {
        return this.Columns.get(i);
    }
}

class Column
{
    constructor()
    {
        this.Inputs = new ArrayList();
    }

    add(ctrl)
    {
        this.Inputs.add(ctrl);
    }

    control(id)
    {
        return (typeof id == 'number') ? this.Inputs.get(id) : this.Inputs.find('name', id);
    }
}