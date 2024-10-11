const libbcmath = {
    PLUS: "+",
    MINUS: "-",
    BASE: 10,
    scale: 0,

    // Define a number structure with basic methods
    bc_num() {
        this.n_sign = null;
        this.n_len = null;
        this.n_scale = null;
        this.n_value = null;

        this.toString = function () {
            const a = this.n_value.join("");
            let b = (this.n_sign === libbcmath.PLUS ? "" : this.n_sign) + a.substr(0, this.n_len);
            if (this.n_scale > 0) {
                b += "." + a.substr(this.n_len, this.n_scale);
            }
            return b;
        };

        this.setScale = function (a) {
            while (this.n_scale < a) {
                this.n_value.push(0);
                this.n_scale++;
            }
            while (this.n_scale > a) {
                this.n_value.pop();
                this.n_scale--;
            }
            return this;
        };
    },

    // Creates a new number with specified length and scale
    bc_new_num(len, scale) {
        const num = new this.bc_num();
        num.n_sign = this.PLUS;
        num.n_len = len;
        num.n_scale = scale;
        num.n_value = this.safe_emalloc(1, len + scale, 0);
        this.memset(num.n_value, 0, 0, len + scale);
        return num;
    },

    // Simulates memory allocation
    safe_emalloc(c, b, a) {
        return Array((c * b) + a);
    },

    // Initialize a number to zero
    bc_init_num() {
        return new this.bc_new_num(1, 0);
    },

    // Remove leading zeros from a number
    _bc_rm_leading_zeros(a) {
        while ((a.n_value[0] === 0) && a.n_len > 1) {
            a.n_value.shift();
            a.n_len--;
        }
    },

    // Convert a string to a number
    php_str2num(b) {
        const dotIndex = b.indexOf(".");
        return dotIndex === -1 ? this.bc_str2num(b, 0) : this.bc_str2num(b, b.length - dotIndex);
    },

    CH_VAL: (a) => a - "0",
    BCD_CHAR: (a) => a + "0",
    isdigit: (a) => !isNaN(parseInt(a, 10)),

    bc_str2num(h, c) {
        const g = h.split("");
        let a = 0;
        let b = 0;
        let e = 0;

        if (g[a] === "+" || g[a] === "-") a++;
        while (g[a] === "0") a++;
        while (g[a] % 1 === 0) {
            a++;
            b++;
        }
        if (g[a] === ".") a++;
        while (g[a] % 1 === 0) {
            a++;
            e++;
        }
        if (g[a] || (b + e === 0)) return this.bc_init_num();

        e = this.MIN(e, c);
        const num = this.bc_new_num(b || 1, e);
        a = 0;
        num.n_sign = g[a] === "-" ? this.MINUS : this.PLUS;
        if (g[a] === "+" || g[a] === "-") a++;
        while (g[a] === "0") a++;
        for (let d = 0; b > 0; b--) num.n_value[d++] = this.CH_VAL(g[a++]);
        if (e > 0) {
            a++;
            for (let d = 0; e > 0; e--) num.n_value[d++] = this.CH_VAL(g[a++]);
        }
        return num;
    },

    cint: (b) => (isNaN(parseInt(b, 10)) ? 0 : parseInt(b, 10)),
    MIN: (d, c) => (d > c ? c : d),
    MAX: (d, c) => (d > c ? d : c),
    ODD: (b) => b & 1,

    memset(d, e, c, a) {
        for (let b = 0; b < a; b++) d[e + b] = c;
    },

    memcpy(b, f, e, d, a) {
        for (let c = 0; c < a; c++) b[f + c] = e[d + c];
        return true;
    },

    bc_is_zero(a) {
        let b = a.n_len + a.n_scale;
        let c = 0;
        while (b > 0 && a.n_value[c++] === 0) b--;
        return b === 0;
    },

    bc_out_of_memory() {
        throw new Error("(BC) Out of memory");
    },

    bc_add(f, d, c) {
        let result;
        if (f.n_sign === d.n_sign) {
            result = this._bc_do_add(f, d, c);
            result.n_sign = f.n_sign;
        } else {
            const comparison = this._bc_do_compare(f, d, false, false);
            switch (comparison) {
                case -1:
                    result = this._bc_do_sub(d, f, c);
                    result.n_sign = d.n_sign;
                    break;
                case 0:
                    result = this.bc_new_num(1, this.MAX(c, this.MAX(f.n_scale, d.n_scale)));
                    this.memset(result.n_value, 0, 0, result.n_len + result.n_scale);
                    break;
                case 1:
                    result = this._bc_do_sub(f, d, c);
                    result.n_sign = f.n_sign;
                    break;
            }
        }
        return result;
    },

    bc_compare(b, a) {
        return this._bc_do_compare(b, a, true, false);
    },

    _bc_do_compare(e, d, c, b) {
        let g = 0;
        let a = 0;
        let f;
        if (c && e.n_sign !== d.n_sign) {
            return e.n_sign === this.PLUS ? 1 : -1;
        }
        if (e.n_len !== d.n_len) {
            return e.n_len > d.n_len ? (!c || e.n_sign === this.PLUS ? 1 : -1) : (!c || e.n_sign === this.PLUS ? -1 : 1);
        }
        f = e.n_len + Math.min(e.n_scale, d.n_scale);
        while (f > 0 && e.n_value[g] === d.n_value[a]) {
            g++;
            a++;
            f--;
        }
        if (b && f === 1 && e.n_scale === d.n_scale) return 0;
        if (f !== 0) {
            return e.n_value[g] > d.n_value[a]
                ? !c || e.n_sign === this.PLUS
                    ? 1
                    : -1
                : !c || e.n_sign === this.PLUS
                    ? -1
                    : 1;
        }
        if (e.n_scale !== d.n_scale) {
            if (e.n_scale > d.n_scale) {
                for (f = e.n_scale - d.n_scale; f > 0; f--) {
                    if (e.n_value[g++] !== 0) {
                        return !c || e.n_sign === this.PLUS ? 1 : -1;
                    }
                }
            } else {
                for (f = d.n_scale - e.n_scale; f > 0; f--) {
                    if (d.n_value[a++] !== 0) {
                        return !c || e.n_sign === this.PLUS ? -1 : 1;
                    }
                }
            }
        }
        return 0;
    },

    _one_mult(d, e, i, f, j, c) {
        let h;
        let g;
        let b = e + i - 1;
        let a = c + i - 1;
        let carry = 0;
        if (f === 0) {
            this.memset(j, 0, 0, i);
        } else if (f === 1) {
            this.memcpy(j, c, d, e, i);
        } else {
            while (i-- > 0) {
                g = d[b--] * f + carry;
                j[a--] = g % this.BASE;
                carry = Math.floor(g / this.BASE);
            }
            if (carry !== 0) {
                j[a] = carry;
            }
        }
    },

    bc_divide(l, k, z) {
        let w;
        if (this.bc_is_zero(k)) {
            return -1;
        }
        if (this.bc_is_zero(l)) {
            return this.bc_new_num(1, z);
        }
        const wNum = this._divide_logic(l, k, z);
        this._bc_rm_leading_zeros(wNum);
        return wNum;
    },

    _divide_logic(l, k, z) {
        let w = this.bc_new_num(l.n_len, z);
        this.memset(w.n_value, 0, 0, w.n_len);
        return w;
    }
};

// Add two numbers using bc math
const bcadd = (b, d, f = libbcmath.scale) => {
    f = f < 0 ? 0 : f;
    let e = libbcmath.bc_init_num();
    let c = libbcmath.bc_init_num();
    let a = libbcmath.bc_init_num();

    e = libbcmath.php_str2num(b.toString());
    c = libbcmath.php_str2num(d.toString());

    if (e.n_scale > c.n_scale) {
        c.setScale(e.n_scale);
    }
    if (c.n_scale > e.n_scale) {
        e.setScale(c.n_scale);
    }

    a = libbcmath.bc_add(e, c, f);
    if (a.n_scale > f) {
        a.n_scale = f;
    }
    return a.toString();
};

// Subtract two numbers using bc math
const bcsub = (b, d, f = libbcmath.scale) => {
    f = f < 0 ? 0 : f;
    let e = libbcmath.bc_init_num();
    let c = libbcmath.bc_init_num();
    let a = libbcmath.bc_init_num();

    e = libbcmath.php_str2num(b.toString());
    c = libbcmath.php_str2num(d.toString());

    if (e.n_scale > c.n_scale) {
        c.setScale(e.n_scale);
    }
    if (c.n_scale > e.n_scale) {
        e.setScale(c.n_scale);
    }

    a = libbcmath.bc_sub(e, c, f);
    if (a.n_scale > f) {
        a.n_scale = f;
    }
    return a.toString();
};

// Multiply two numbers using bc math
const bcmul = (b, d, f = libbcmath.scale) => {
    f = f < 0 ? 0 : f;
    let e = libbcmath.bc_init_num();
    let c = libbcmath.bc_init_num();
    let a = libbcmath.bc_init_num();

    e = libbcmath.php_str2num(b.toString());
    c = libbcmath.php_str2num(d.toString());

    if (e.n_scale > c.n_scale) {
        c.setScale(e.n_scale);
    }
    if (c.n_scale > e.n_scale) {
        e.setScale(c.n_scale);
    }

    a = libbcmath.bc_multiply(e, c, f);
    if (a.n_scale > f) {
        a.n_scale = f;
    }
    return a.toString();
};

// Divide two numbers using bc math
const bcdiv = (b, d, f = libbcmath.scale) => {
    f = f < 0 ? 0 : f;
    let e = libbcmath.bc_init_num();
    let c = libbcmath.bc_init_num();
    let a = libbcmath.bc_init_num();

    e = libbcmath.php_str2num(b.toString());
    c = libbcmath.php_str2num(d.toString());

    if (e.n_scale > c.n_scale) {
        c.setScale(e.n_scale);
    }
    if (c.n_scale > e.n_scale) {
        e.setScale(c.n_scale);
    }

    a = libbcmath.bc_divide(e, c, f);
    if (a === -1) {
        throw new Error("Division by zero");
    }

    if (a.n_scale > f) {
        a.n_scale = f;
    }
    return a.toString();
};

// Compare two numbers using bc math
const bccomp = (a, c, e = libbcmath.scale) => {
    e = e < 0 ? 0 : e;
    let d = libbcmath.bc_init_num();
    let b = libbcmath.bc_init_num();

    d = libbcmath.bc_str2num(a.toString(), e);
    b = libbcmath.bc_str2num(c.toString(), e);

    return libbcmath.bc_compare(d, b, e);
};

// Set the global scale for bc math
const bcscale = (a) => {
    a = parseInt(a, 10);
    if (isNaN(a) || a < 0) {
        return false;
    }
    libbcmath.scale = a;
    return true;
};

// Round a number using bc math
const bcround = (d, b) => {
    let a = `0.${"0".repeat(b)}5`;
    if (d.toString().startsWith("-")) {
        a = `-${a}`;
    }
    const c = bcadd(d, a, b);
    return c;
};
