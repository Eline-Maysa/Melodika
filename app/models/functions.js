module.exports = class UsuarioDAL {
    
    constructor(conexao) {
        this.conexao = conexao;
    }

    create(camposJson) {
        return new Promise((resolve, reject) => {
            this.conexao.query("insert into usuario set ?",
                camposJson,
                function (error, elements) {
                    if (error) {
                        return reject(error);
                    }
                    return resolve(elements);
                });
        });
    };

    findUserEmail(camposForm) {
        return new Promise((resolve, reject) => {
            this.conexao.query("SELECT * FROM usuario WHERE (apelido_do_usuario = ? or email = ?) and (tipo = '1' or tipo = '2')",
            [camposForm.email, camposForm.email],
                function (error, elements) {
                    if (error) {
                        return reject(error);
                    }

                    return resolve(elements);
                });
        });
    };

    findEmail(camposForm) {

        return new Promise((resolve, reject) => {

            this.conexao.query("SELECT * FROM usuario WHERE email = ?",

            [camposForm.email],

                function (error, elements) {

                    if (error) {

                        return reject(error);

                    }

 

                    return resolve(elements);

                });

        });

    };

    findID(id) {
        return new Promise((resolve, reject) => {
            this.conexao.query("SELECT * FROM usuario WHERE id_usuario = ?", [id], function (error, elements) {
                    if (error) {
                        console.log(error);
                        return reject(error);
                    }
                        console.log(elements);
                    return resolve(elements);
                });
        });
    };

    update(camposJson, id) {
        return new Promise((resolve, reject) => {
            this.conexao.query("UPDATE usuario SET ? WHERE id_usuario = ?",
            [camposJson, id],
            function (error, results, fields) {
                if (error) {
                    return reject(error);
                }
                return resolve(results);
            });
        });
    }

    delete(id) {
        return new Promise((resolve, reject) => {
            this.conexao.query("UPDATE usuario SET tipo = '0' WHERE id_usuario = ?", [id], function (error, results) {
                if (error) {
                    return reject(error);
                }
                return resolve(results[0]);
            });
        });
    }

    findAdm() {
        return new Promise((resolve, reject) => {
            this.conexao.query("SELECT * FROM usuario", function (error, elements) {
                    if (error) {
                        return reject(error);
                    }
                    return resolve(elements);
                });
        });
    };
}
// function verificarUsuAutenticado(req, res, next) {
//     if (req.session.autenticado) {
//         var autenticado = req.session.autenticado;
//     } else {
//         var autenticado = { autenticado: null };
//     }
//     req.session.autenticado = autenticado;
//     next();
// }

// module.exports = {
//     verificarUsuAutenticado
// }