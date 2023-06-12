export interface Producto {
    id:              number;
    created:         Date;
    modified:        Date;
    codigo:          string;
    codigo_barras:   string;
    nombre:          string;
    descripcion:     string;
    unidad:          string;
    imagen_url:      string;
    usa_inventarios: boolean;
    usa_lotes:       boolean;
    stock:           number;
    stock_minimo:    number;
    precio_compra:   string;
    precio_venta:    string;
    categoria:       Categoria;
    grupo:           Grupo;
    proveedor:       Proveedor;
    estado:          Estado;
}

export interface Categoria {
    id:          number;
    created:     Date;
    modified:    Date;
    descripcion: string;
    estado:      Estado;
}

export interface Grupo {
    id:          number;
    created:     Date;
    modified:    Date;
    descripcion: string;
    estado:      Estado;
}

export interface Estado {
    id:       number;
    created:  Date;
    modified: Date;
    estado:   string;
}

export interface Proveedor {
    id:        number;
    created:   Date;
    modified:  Date;
    nombre:    string;
    direccion: string;
    nit:       string;
    contacto:  string;
    celular:   string;
    estado:    Estado;
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
    public static toProducto(json: string): Producto[] {
        return cast(JSON.parse(json), a(r("Producto")));
    }

    public static productoToJson(value: Producto[]): string {
        return JSON.stringify(uncast(value, a(r("Producto"))), null, 2);
    }
}

function invalidValue(typ: any, val: any, key: any, parent: any = ''): never {
    const prettyTyp = prettyTypeName(typ);
    const parentText = parent ? ` on ${parent}` : '';
    const keyText = key ? ` for key "${key}"` : '';
    throw Error(`Invalid value${keyText}${parentText}. Expected ${prettyTyp} but got ${JSON.stringify(val)}`);
}

function prettyTypeName(typ: any): string {
    if (Array.isArray(typ)) {
        if (typ.length === 2 && typ[0] === undefined) {
            return `an optional ${prettyTypeName(typ[1])}`;
        } else {
            return `one of [${typ.map(a => { return prettyTypeName(a); }).join(", ")}]`;
        }
    } else if (typeof typ === "object" && typ.literal !== undefined) {
        return typ.literal;
    } else {
        return typeof typ;
    }
}

function jsonToJSProps(typ: any): any {
    if (typ.jsonToJS === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.json] = { key: p.js, typ: p.typ });
        typ.jsonToJS = map;
    }
    return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
    if (typ.jsToJSON === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.js] = { key: p.json, typ: p.typ });
        typ.jsToJSON = map;
    }
    return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any, key: any = '', parent: any = ''): any {
    function transformPrimitive(typ: string, val: any): any {
        if (typeof typ === typeof val) return val;
        return invalidValue(typ, val, key, parent);
    }

    function transformUnion(typs: any[], val: any): any {
        // val must validate against one typ in typs
        const l = typs.length;
        for (let i = 0; i < l; i++) {
            const typ = typs[i];
            try {
                return transform(val, typ, getProps);
            } catch (_) {}
        }
        return invalidValue(typs, val, key, parent);
    }

    function transformEnum(cases: string[], val: any): any {
        if (cases.indexOf(val) !== -1) return val;
        return invalidValue(cases.map(a => { return l(a); }), val, key, parent);
    }

    function transformArray(typ: any, val: any): any {
        // val must be an array with no invalid elements
        if (!Array.isArray(val)) return invalidValue(l("array"), val, key, parent);
        return val.map(el => transform(el, typ, getProps));
    }

    function transformDate(val: any): any {
        if (val === null) {
            return null;
        }
        const d = new Date(val);
        if (isNaN(d.valueOf())) {
            return invalidValue(l("Date"), val, key, parent);
        }
        return d;
    }

    function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
        if (val === null || typeof val !== "object" || Array.isArray(val)) {
            return invalidValue(l(ref || "object"), val, key, parent);
        }
        const result: any = {};
        Object.getOwnPropertyNames(props).forEach(key => {
            const prop = props[key];
            const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
            result[prop.key] = transform(v, prop.typ, getProps, key, ref);
        });
        Object.getOwnPropertyNames(val).forEach(key => {
            if (!Object.prototype.hasOwnProperty.call(props, key)) {
                result[key] = transform(val[key], additional, getProps, key, ref);
            }
        });
        return result;
    }

    if (typ === "any") return val;
    if (typ === null) {
        if (val === null) return val;
        return invalidValue(typ, val, key, parent);
    }
    if (typ === false) return invalidValue(typ, val, key, parent);
    let ref: any = undefined;
    while (typeof typ === "object" && typ.ref !== undefined) {
        ref = typ.ref;
        typ = typeMap[typ.ref];
    }
    if (Array.isArray(typ)) return transformEnum(typ, val);
    if (typeof typ === "object") {
        return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
            : typ.hasOwnProperty("arrayItems")    ? transformArray(typ.arrayItems, val)
            : typ.hasOwnProperty("props")         ? transformObject(getProps(typ), typ.additional, val)
            : invalidValue(typ, val, key, parent);
    }
    // Numbers can be parsed by Date but shouldn't be.
    if (typ === Date && typeof val !== "number") return transformDate(val);
    return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
    return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
    return transform(val, typ, jsToJSONProps);
}

function l(typ: any) {
    return { literal: typ };
}

function a(typ: any) {
    return { arrayItems: typ };
}

function u(...typs: any[]) {
    return { unionMembers: typs };
}

function o(props: any[], additional: any) {
    return { props, additional };
}

function m(additional: any) {
    return { props: [], additional };
}

function r(name: string) {
    return { ref: name };
}

const typeMap: any = {
    "Producto": o([
        { json: "id", js: "id", typ: 0 },
        { json: "created", js: "created", typ: Date },
        { json: "modified", js: "modified", typ: Date },
        { json: "codigo", js: "codigo", typ: "" },
        { json: "codigo_barras", js: "codigo_barras", typ: "" },
        { json: "nombre", js: "nombre", typ: "" },
        { json: "descripcion", js: "descripcion", typ: "" },
        { json: "unidad", js: "unidad", typ: "" },
        { json: "imagen_url", js: "imagen_url", typ: "" },
        { json: "usa_inventarios", js: "usa_inventarios", typ: true },
        { json: "usa_lotes", js: "usa_lotes", typ: true },
        { json: "stock", js: "stock", typ: 0 },
        { json: "stock_minimo", js: "stock_minimo", typ: 0 },
        { json: "precio_compra", js: "precio_compra", typ: "" },
        { json: "precio_venta", js: "precio_venta", typ: "" },
        { json: "categoria", js: "categoria", typ: r("Categoria") },
        { json: "grupo", js: "grupo", typ: r("Categoria") },
        { json: "proveedor", js: "proveedor", typ: r("Proveedor") },
        { json: "estado", js: "estado", typ: r("Estado") },
    ], false),
    "Categoria": o([
        { json: "id", js: "id", typ: 0 },
        { json: "created", js: "created", typ: Date },
        { json: "modified", js: "modified", typ: Date },
        { json: "descripcion", js: "descripcion", typ: "" },
        { json: "estado", js: "estado", typ: 0 },
    ], false),
    "Estado": o([
        { json: "id", js: "id", typ: 0 },
        { json: "created", js: "created", typ: Date },
        { json: "modified", js: "modified", typ: Date },
        { json: "estado", js: "estado", typ: "" },
    ], false),
    "Proveedor": o([
        { json: "id", js: "id", typ: 0 },
        { json: "created", js: "created", typ: Date },
        { json: "modified", js: "modified", typ: Date },
        { json: "nombre", js: "nombre", typ: "" },
        { json: "direccion", js: "direccion", typ: "" },
        { json: "nit", js: "nit", typ: "" },
        { json: "contacto", js: "contacto", typ: "" },
        { json: "celular", js: "celular", typ: "" },
        { json: "estado", js: "estado", typ: 0 },
    ], false),
};
