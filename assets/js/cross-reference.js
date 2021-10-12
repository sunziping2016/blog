class XCard extends HTMLElement {
    constructor() {
        super();
    }
}

class XWip extends HTMLElement {
    constructor() {
        super();
        const sup = document.createElement('sup');
        this.appendChild(sup);
    }
}

class XComment extends HTMLElement {
    constructor() {
        super();
    }
}

class XWarning extends HTMLElement {
    constructor() {
        super();
        this.classList.add('warning');
        const comment = this.getAttribute('comment');
        if (comment) {
            const sup = document.createElement('sup');
            sup.appendChild(document.createTextNode(`[${comment}]`));
            this.appendChild(sup);
        }
    }
}

const theorems = [];
const theoremIndices = {};

class XTheorem extends HTMLElement {
    constructor() {
        super();
        const index = theorems.length;
        const name = this.getAttribute('id') || `theorem-${index + 1}`
        this.setAttribute('id', name);
        theorems.push(this);
        theoremIndices[name] = index;
        const label = document.createElement('a');
        label.appendChild(document.createTextNode(`定理 ${index + 1}`));
        label.setAttribute('href', `#${name}`);
        label.classList.add('theorem-label');
        this.insertBefore(label, this.firstChild);
    }
}

class XProof extends HTMLElement {
    constructor() {
        super();
        const name = this.getAttribute('for');
        const label = document.createElement('a');
        label.classList.add('proof-label');
        if (name === null || theoremIndices[name] === undefined) {
            label.appendChild(document.createTextNode('未知证明'));
            label.classList.add('warning');
        } else {
            const index = theoremIndices[name];
            label.appendChild(document.createTextNode(`证明 ${index + 1}`));
            label.setAttribute('href', `#${name}`);
        }
        this.insertBefore(label, this.firstChild);
        // QED.
        const tail = document.createElement('div');
        tail.classList.add('proof-qed');
        this.appendChild(tail);
    }
}

const refTheorems = [];

class XRefTheorem extends HTMLElement {
    constructor() {
        super();
        this.name = this.getAttribute('ref');
        this.label = document.createElement('a');
        this.label.classList.add('ref-theorem-label');
        this.label.appendChild(document.createTextNode('未知定理'));
        this.label.classList.add('warning');
        this.appendChild(this.label);
        this.classList.add('ref-theorem');
        refTheorems.push(this);
    }
}

const algorithms = [];
const algorithmIndices = {};

class XAlgorithm extends HTMLElement {
    constructor() {
        super();
        const index = algorithms.length;
        const name = this.getAttribute('id') || `algorithm-${index + 1}`;
        this.setAttribute('id', name);
        algorithms.push(this);
        algorithmIndices[name] = index;
        const label = document.createElement('a');
        label.appendChild(document.createTextNode(`算法 ${index + 1}`));
        label.setAttribute('href', `#${name}`);
        label.classList.add('algorithm-label');
        this.insertBefore(label, this.firstChild);
    }
}

class XPseudoCode extends HTMLElement {
    constructor() {
        super();
        const name = this.getAttribute('for');
        const label = document.createElement('a');
        if (name === null || algorithmIndices[name] === undefined) {
            label.appendChild(document.createTextNode('未知伪码'));
            this.insertBefore(label, this.firstChild);
            label.classList.add('warning');
        } else {
            const index = algorithmIndices[name];
            label.appendChild(document.createTextNode(`伪码 ${index + 1}`));
            label.setAttribute('href', `#${name}`);
        }
        label.classList.add('pseudo-code-label');
        this.insertBefore(label, this.firstChild);
    }
}

const refAlgorithms = [];

class XRefAlgorithm extends HTMLElement {
    constructor() {
        super();
        this.label = document.createElement('a');
        this.name = this.getAttribute('ref');
        this.label.classList.add('ref-algorithm-label');
        this.label.appendChild(document.createTextNode('未知算法'));
        this.label.classList.add('warning');
        this.appendChild(this.label);
        this.classList.add('ref-algorithm');
        refAlgorithms.push(this);
    }
}

const figures = [];
const figureIndices = {};

class XFigure extends HTMLElement {
    constructor() {
        super();
        const index = figures.length;
        const name = this.getAttribute('id') || `figure-${index + 1}`;
        this.setAttribute('id', name);
        figures.push(this);
        figureIndices[name] = index;
        const figure = document.createElement('figure');
        figure.classList.add('no-counter');
        const img = document.createElement('img');
        img.setAttribute('src', this.getAttribute('src'));
        img.setAttribute('alt', this.getAttribute('alt') || this.innerText);
        figure.appendChild(img);
        const figcaption = document.createElement('figcaption');
        const label = document.createElement('a');
        label.appendChild(document.createTextNode(`图片 ${index + 1}`));
        label.setAttribute('href', `#${name}`);
        label.classList.add('figure-label');
        figcaption.appendChild(label);
        const children = Array.from(this.childNodes);
        children.forEach(child => {
            child.remove();
            figcaption.appendChild(child);
        });
        figure.appendChild(figcaption);
        this.appendChild(figure);
    }
}

const refFigures = [];

class XRefFigure extends HTMLElement {
    constructor() {
        super();
        this.label = document.createElement('a');
        this.name = this.getAttribute('ref');
        this.label.classList.add('ref-figure-label');
        this.label.appendChild(document.createTextNode('未知图片'));
        this.label.classList.add('warning');
        this.appendChild(this.label);
        refFigures.push(this);
    }
}

const tables = [];
const tableIndices = {};

class XTable extends HTMLElement {
    constructor() {
        super();
        const index = tables.length;
        const name = this.getAttribute('id') || `table-${index + 1}`;
        this.setAttribute('id', name);
        tables.push(this);
        tableIndices[name] = index;
        const figure = document.createElement('figure');
        figure.classList.add('no-counter');
        const figcaption = document.createElement('figcaption');
        const label = document.createElement('a');
        label.appendChild(document.createTextNode(`表格 ${index + 1}`));
        label.setAttribute('href', `#${name}`);
        label.classList.add('table-label');
        figcaption.appendChild(label);
        const children = Array.from(this.childNodes);
        children.forEach(child => {
            child.remove();
            if (child.tagName === 'TABLE') {
                figure.appendChild(child);
            } else if (child.tagName === 'P') {
                Array.from(child.childNodes).forEach(child => figcaption.appendChild(child));
            }
        });
        figure.appendChild(figcaption);
        this.appendChild(figure);
    }
}

const refTables = [];

class XRefTable extends HTMLElement {
    constructor() {
        super();
        this.label = document.createElement('a');
        this.name = this.getAttribute('ref');
        this.label.classList.add('ref-table-label');
        this.label.appendChild(document.createTextNode('未知表格'));
        this.label.classList.add('warning');
        this.appendChild(this.label);
        refTables.push(this);
    }
}

const formulas = [];
const formulaIndices = {};

class XFormula extends HTMLElement {
    constructor() {
        super();
        const index = formulas.length;
        const name = this.getAttribute('id') || `formula-${index + 1}`;
        this.setAttribute('id', name);
        formulas.push(this);
        formulaIndices[name] = index;
        const label = document.createElement('a');
        label.appendChild(document.createTextNode(`${index + 1}`));
        label.setAttribute('href', `#${name}`);
        label.classList.add('formula-label');
        this.appendChild(label);
    }
}

const refFormulas = [];

class XRefFormula extends HTMLElement {
    constructor() {
        super();
        this.name = this.getAttribute('ref');
        this.label = document.createElement('a');
        this.label.classList.add('ref-formula-label');
        this.label.appendChild(document.createTextNode('未知公式'));
        this.label.classList.add('warning');
        this.appendChild(this.label);
        this.classList.add('ref-formula');
        refFormulas.push(this);
    }
}

const refHeadings = [];

class XRefHeading extends HTMLElement {
    constructor() {
        super();
        this.name = this.getAttribute('ref');
        this.label = document.createElement('a');
        this.label.classList.add('ref-heading-label');
        this.label.appendChild(document.createTextNode('未知章节'));
        this.label.classList.add('warning');
        this.appendChild(this.label);
        this.classList.add('ref-heading');
        refHeadings.push(this);
    }
}

customElements.define('x-card', XCard);
customElements.define('x-wip', XWip);
customElements.define('x-comment', XComment);
customElements.define('x-warning', XWarning);
customElements.define('x-theorem', XTheorem);
customElements.define('x-proof', XProof);
customElements.define('x-ref-theorem', XRefTheorem);
customElements.define('x-algorithm', XAlgorithm);
customElements.define('x-pseudo-code', XPseudoCode);
customElements.define('x-ref-algorithm', XRefAlgorithm);
customElements.define('x-figure', XFigure);
customElements.define('x-ref-figure', XRefFigure);
customElements.define('x-table', XTable);
customElements.define('x-ref-table', XRefTable);
customElements.define('x-formula', XFormula);
customElements.define('x-ref-formula', XRefFormula);
customElements.define('x-ref-heading', XRefHeading);

refTheorems.forEach(th => {
    const name = th.name;
    const label = th.label;
    if (name !== null && theoremIndices[name] !== undefined) {
        const index = theoremIndices[name];
        label.firstChild.nodeValue = `定理 ${index + 1}`;
        label.classList.remove('warning');
        label.setAttribute('href', `#${name}`);
    }
});

refAlgorithms.forEach(algo => {
    const name = algo.name;
    const label = algo.label;
    if (name !== null && algorithmIndices[name] !== undefined) {
        const index = algorithmIndices[name];
        label.firstChild.nodeValue = `算法 ${index + 1}`;
        label.classList.remove('warning');
        label.setAttribute('href', `#${name}`);
    }
});

refFigures.forEach(fig => {
    const name = fig.name;
    const label = fig.label;
    if (name !== null && figureIndices[name] !== undefined) {
        const index = figureIndices[name];
        label.firstChild.nodeValue = `图片 ${index + 1}`;
        label.classList.remove('warning');
        label.setAttribute('href', `#${name}`);
    }
});

refTables.forEach(tab => {
    const name = tab.name;
    const label = tab.label;
    if (name !== null && tableIndices[name] !== undefined) {
        const index = tableIndices[name];
        label.firstChild.nodeValue = `表格 ${index + 1}`;
        label.classList.remove('warning');
        label.setAttribute('href', `#${name}`);
    }
});

refFormulas.forEach(eq => {
    const name = eq.name;
    const label = eq.label;
    if (name !== null && formulaIndices[name] !== undefined) {
        const index = formulaIndices[name];
        label.firstChild.nodeValue = `公式 ${index + 1}`;
        label.classList.remove('warning');
        label.setAttribute('href', `#${name}`);
    }
});

const headings = Array.from(document.querySelectorAll('h2, h3, h4')).filter(h => h.getAttribute('id') !== null);
const headingIndices = {};
const headingLevels = {
    'H2': 1,
    'H3': 2,
    'H4': 3,
}
const headingCategories = {
    'H2': '章',
    'H3': '节',
    'H4': '小节',
}
const headingCounters = [];

headings.forEach((h, idx) => {
    h.classList.add('no-counter');
    const name = h.getAttribute('id');
    headingIndices[name] = idx;
    if (headingLevels[h.tagName] !== undefined) {
        const level = headingLevels[h.tagName];
        while (level > headingCounters.length) {
            headingCounters.push(0);
        }
        while (level < headingCounters.length) {
            headingCounters.pop();
        }
        if (level > 0) {
            ++headingCounters[headingCounters.length - 1];
            const label = document.createElement('a');
            h.label = headingCounters.join('.');
            label.appendChild(document.createTextNode(h.label));
            label.setAttribute('href', `#${name}`);
            label.classList.add('heading-label');
            h.insertBefore(label, h.firstChild);
        }
    }
});

refHeadings.forEach(h => {
    const name = h.name;
    const label = h.label;
    if (name !== null && headingIndices[name] !== undefined) {
        const heading = headings[headingIndices[name]];
        const category = headingCategories[heading.tagName];
        const number = heading.label;
        if (category !== undefined && number !== undefined) {
            label.firstChild.nodeValue = `${category} ${number}`;
            label.classList.remove('warning');
            label.setAttribute('href', `#${heading.getAttribute('id')}`);
        }
    }
});
