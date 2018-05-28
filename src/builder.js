class ArrayList
{
    constructor()
    {
        this.arr = new Array();
    }

    get last()
    {
        return this.arr[this.length - 1];
    }

    get length()
    {
        return this.arr.length;
    }

    add(el)
    {
        return this.arr.push(el);
    }

    addAll(arr)
    {
        for (var i = 0; i < arr.length; i++)
            this.add(arr[i]);

        return true;
    }

    find(attrib, value)
    {
        if (arguments.length == 1) {
            value = attrib;

            attrib = 'name';
        }

        for (var i = 0; i < this.arr.length; i++) {
            var el = this.arr[i];

            if (el[attrib] == value) 
                return el;
        }
    }

    get(i)
    {
        return this.arr[i];
    }

    toArray()
    {
        return this.arr;
    }
}

class FormBuilder
{
    constructor()
    {
        this.toolbox = new Toolbox(); 
        this.form = new Form();
    }

    get pages()
    {
        return this.form.pages;
    }

    get sections()
    {
        var arr = new ArrayList();

        for (var i = 0; i < this.pages.length; i++)
            arr.addAll(this.form.page(i).sections.toArray());

        return arr;
    }

    add(ctrl)
    {
        this.form.add(ctrl);
    }

    find(id)
    {
        var el;

        if (typeof id != 'string') 
            return false;

        else if (el = this.form.page(id)) 
            return el;

        else
        {
            // TODO
        }
    }
}

class Toolbox
{
    constructor()
    {
        this.ctrls = new Array();
    }

    add(ctrl)
    {
        if (ctrl instanceof Control)
            this.ctrls.push(ctrl);
        else 
            return false;
    }
}

class Control
{
    constructor(type, props)
    {
        this.props = new Array();

        for (var i = 0; i < props.length; i++) 
            this.props.push(new Property(props[i]));

        this.type = type;
    }
}

class Property
{
    constructor(args)
    {
        for (const [key, value] of Object.entries(args))
            this[key] = value;
    }
}

class Form
{
    constructor()
    {
        this.pages = new ArrayList();
    }

    add(ctrl)
    {
        if (ctrl instanceof Page)
            this.pages.add(ctrl);

        else 
        {
            if (this.pages.length == 0)
                this.pages.add(new Page('Untitled Page'));

            this.page(0).add(ctrl);
        }
    }

    page(id)
    {
        return (typeof id == 'number') ? this.pages.get(id) : this.pages.find(id);
    }
}

class Page
{
    constructor(name = '')
    {
        this.sections = new ArrayList();

        this.name = name;
    }

    add(ctrl)
    {
        if (ctrl instanceof Section)
            this.sections.add(ctrl);

        else
        {
            if (this.sections.length == 0)
                this.sections.add(new Section('Unnamed Section'))

            this.section(0).add(ctrl);
        }
    }

    section(id)
    {
        return (typeof id == 'number') ? this.sections.get(id) : this.sections.find(id);
    }
}

class Section
{
    constructor(name = '')
    {
        this.subs = new ArrayList();
        this.name = name;
    }

    add(ctrl)
    {
        if (ctrl instanceof Subsection)
            this.subs.add(ctrl);

        else
        {
            if (this.subs.length == 0)
                this.subs.add(new Subsection());

            this.sub(0).add(ctrl);
        }
    }

    sub(i)
    {
        return this.subs.get(i);
    }
}

class Subsection
{
    constructor()
    {
        this.rows = new ArrayList();
    }

    add(ctrl)
    {
        if (ctrl instanceof Row)
            this.rows.add(ctrl);
        else
            this.rows.add(new Row()) && this.rows.last.add(ctrl);;
    }

    row(i)
    {
        return this.rows.get(i);
    }
}

class Row
{
    constructor()
    {
        this.cols = new ArrayList();
    }

    add(ctrl)
    {
        if (ctrl instanceof Column)
            this.cols.add(ctrl);

        else
        {
            if (this.cols.length == 0)
                this.cols.add(new Column());

            this.col(0).add(ctrl);
        }
    }

    col(i)
    {
        return this.cols.get(i);
    }
}

class Column
{
    constructor()
    {
        this.io = new ArrayList();
    }

    add(ctrl)
    {
        this.io.add(ctrl);
    }

    control(id)
    {
        return (typeof id == 'number') ? this.io.get(id) : this.io.find(id);
    }
}

class Input
{
    constructor(name)
    {
        this.name = name;
    }
}

class TextBox extends Input
{
    constructor(name)
    {
        super(name);
    }
}