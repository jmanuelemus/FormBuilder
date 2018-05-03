class FormBuilder
{
    constructor()
    {
        this.Toolbox = new Toolbox(); 

        this.Form    = new Form();
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
            if (this.Sections.length = 0)
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
        this.name = name;
    }
}