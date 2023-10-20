const { validationResult } = require("express-validator");


function verificarUsuAutenticado(req, res, next) {
    if (req.session.autenticado) {
        var autenticado = req.session.autenticado;
    } else {
        var autenticado = {
            autenticado: null, img_perfil_pasta: null,
            id: null, nick: null,
            tipo: null, tel: null,
            user: null
        };
    }
    req.session.autenticado = autenticado;
    next();
}

function limparSessao(req, res, next) {
    req.session.destroy();
    next()
}


function gravarUsuAutenticado(usuarioDAL, bcrypt) {
    return async (req, res, next) => {
        erros = validationResult(req)
        if (erros.isEmpty()) {
            var dadosForm = {
                email: req.body. usuario,
                senha_do_usuario: req.body.senhalog,
            };
            var results = await usuarioDAL.findUserEmail(dadosForm);
            var total = Object.keys(results).length;
            if (total == 1) {
                if (bcrypt.compareSync(dadosForm.senha_do_usuario, results[0].senha_do_usuario)) {
                    var autenticado = {
                        autenticado: results[0].email,
                        img_perfil_pasta: results[0].img_perfil_pasta,
                        id: results[0].id_usuario,
                        nick: results[0].apelido_do_usuario,
                        tipo: results[0].tipo,
                        num: results[0].telefone_do_usuario,
                        user: results[0].nome_do_perfil
                    };
                }
            } else {
                var autenticado = {
                    autenticado: null, img_perfil_pasta: null,
                    id: null, nick: null,
                    tipo: null, tel: null,
                    user: null
                };
            }
        } else {
            var autenticado = {
                autenticado: null, img_perfil_pasta: null,
                id: null, nick: null,
                tipo: null, tel: null,
                user: null
            };
            //tratar os erros no campo do formulário
        }
        req.session.autenticado = autenticado;
        next();
    }
}


function verificarUsuAutorizado(tipoPermitido, destinoFalha) {
    return (req, res, next) => {
        if (req.session.autenticado.autenticado != null //&&
            /*tipoPermitido.find(function (element) { return element == req.session.autenticado.tipo }) != undefined*/) {
            next();
        } else {
            res.redirect('/404');
        }
    };
}

module.exports = {
    verificarUsuAutenticado,
    limparSessao,
    gravarUsuAutenticado,
    verificarUsuAutorizado
}