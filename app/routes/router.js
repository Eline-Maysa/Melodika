var express = require('express');
var router = express.Router();

var bcrypt = require("bcrypt");
var salt = bcrypt.genSaltSync(12);

var fabricaDeConexao = require("../../config/connection-factory");
var conexao = fabricaDeConexao(); 

var UsuarioDAL = require("../models/functions.js");
var usuarioDAL = new UsuarioDAL(conexao);

var { verificarUsuAutenticado, limparSessao, gravarUsuAutenticado,
  verificarUsuAutorizado } = require("../models/autenticador_middleware");  

const { body, validationResult } = require('express-validator');

const multer = require('multer');
var path = require('path');

// ****************** Versão com armazenamento em diretório
// Definindo o diretório de armazenamento das imagens
var storagePasta = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, './app/public/imagens/perfil/') // diretório de destino  
  },
  filename: (req, file, callBack) => {
    callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    //renomeando o arquivo para evitar duplicidade de nomes
  }
})

var upload = multer({ storage: storagePasta });

router.get("/adm", verificarUsuAutenticado, async function (req, res) {
  try {
    let admdata = await usuarioDAL.findAdm();
    console.log(admdata);
    if (req.session.autenticado.tipo == '2'){
    res.render("pages/adm", { dados:admdata, autenticado:req.session.autenticado, listaErros: null, dadosNotificacao: null})
    }
    else {
      res.render("pages/404", {
        listaErros: null, dadosNotificacao: null, valoresper: {
          id: null,  user: "", nick: "", email: "", num: "", cpf: ""
        }, autenticado:req.session.autenticado
      })
    }
  } catch (e) {
    console.log(e)
    res.render("pages/404", {
      listaErros: null, dadosNotificacao: null, valoresper: {
        id: null,  user: "", nick: "", email: "", num: "", cpf: ""
      }, autenticado:req.session.autenticado
    })
  }
});

router.get("/", verificarUsuAutenticado, async function (req, res) {
  try {
    let results = await usuarioDAL.findID(req.session.autenticado.id);
    console.log(results);
    res.render("pages/index", { listaErros: null, dadosNotificacao: null, autenticado: req.session.autenticado })
  } catch (e) {
    console.log(e)
    res.render("pages/index", {
      listaErros: null, dadosNotificacao: null, valoresper: {
        id: null,  user: "", nick: "", email: "", num: "", cpf: ""
      }, autenticado:req.session.autenticado
    })
  }
});

router.get("/404", limparSessao, function (req, res) {
  res.render("pages/404", {
    listaErros: null, dadosNotificacao: null, autenticado:req.session.autenticado, valoresper: {
      id: null,  user: "", nick: "", email: "", num: "", cpf: ""
    }
  })
});

//Essas tres linhas referenciam o arquivo que faz a ligação com o banco

router.get('/cadastrocurso', async function(req, res) {
  try {
    let results = await usuarioDAL.findID(req.session.autenticado.id);
    console.log(results);
    res.render("pages/cadastrocurso", { autenticado:req.session.autenticado, listaErros: null, dadosNotificacao: null})
  } catch (e) {
    console.log(e)
    res.render("pages/cadastrocurso", {
      listaErros: null, autenticado:req.session.autenticado, dadosNotificacao: null, valoresper: {
        id: null,  user: "", nick: "", email: "", num: "", cpf: ""
      }
    })
  }
});
router.get('/chats', async function(req, res) {
  try {
    let results = await usuarioDAL.findID(req.session.autenticado.id);
    console.log(results);

    res.render("pages/chats", { autenticado:req.session.autenticado, listaErros: null, dadosNotificacao: null,})
  } catch (e) {
    console.log(e)
    res.render("pages/chats", {
      listaErros: null, dadosNotificacao: null, autenticado:req.session.autenticado, valoresper: {
        id: null,  user: "", nick: "", email: "", num: "", cpf: ""
      }
    })
  }
});
router.get('/cadperfil', verificarUsuAutenticado, async function(req, res) {
  try {
    let results = await usuarioDAL.findID(req.session.autenticado.id);
    console.log(results);
    res.render("pages/cadperfil", { autenticado: req.session.autenticado, listaErros: null, dadosNotificacao: null})
  } catch (e) {
    console.log(e)
    res.render("pages/filtro", {
      listaErros: null, autenticado:req.session.autenticado, dadosNotificacao: null, valoresper: {
        id: null,  user: "", nick: "", email: "", num: "", cpf: ""
      }
    })
  }
});

router.get('/filtro', verificarUsuAutenticado, async function (req, res) {
  try {
    let results = await usuarioDAL.findID(req.session.autenticado.id);
    console.log(results);
    res.render("pages/filtro", { autenticado:req.session.autenticado, listaErros: null, dadosNotificacao: null })
  } catch (e) {
    console.log(e)
    res.render("pages/filtro", {
      listaErros: null, autenticado:req.session.autenticado, dadosNotificacao: null, valoresper: {
        id: null,  user: "", nick: "", email: "", num: "", cpf: ""
      }
    })
  }
});

router.get('/login', async function(req, res) {
  try {
    let results = await usuarioDAL.findID(req.session.autenticado.id);
    console.log(results);
    res.render("pages/login", { listaErros: null, listaErroslog:null, valores: req.body, dadosNotificacao: null, autenticado:req.session.autenticado })
  } catch (e) {
    console.log(e)
    res.render("pages/login", {
      listaErros: null, dadosNotificacao: null, listaErroslog:null, valores: req.body, valoresper: {
        id: null,  user: "", nick: "", email: "", num: "", cpf: ""
      }, autenticado: req.session.autenticado
    })
  }
});
router.get("/perfil", verificarUsuAutenticado, async function (req, res) {
  try {
    let results = await usuarioDAL.findID(req.session.autenticado.id);
    console.log(results);
    let campos = {
      id: results[0].id_usuario,
      user: results[0].nome_do_perfil, email: results[0].email,
      nick: results[0].apelido_do_usuario, num: results[0].telefone_do_usuario,
      cpf: results[0].cpf_do_usuario, id: results[0].id_usuario, img_perfil_pasta: results[0].img_perfil_pasta
    }
    res.render("pages/perfil", { autenticado:req.session.autenticado, listaErros: null, dadosNotificacao: null, valoresper: campos })
  } catch (e) {
    console.log(e)
    res.render("pages/perfil", {
      listaErros: null, dadosNotificacao: null, autenticado:req.session.autenticado, valoresper: {
        id: null,  user: "", nick: "", email: "", num: "", cpf: ""
      }
    })
  }
});

router.get('/curso', async function (req, res) {
  try {
    let results = await usuarioDAL.findID(req.session.autenticado.id);
    console.log(results);
    res.render("pages/curso", { listaErros: null, autenticado:req.session.autenticado, dadosNotificacao: null})
  } catch (e) {
    console.log(e)
    res.render("pages/curso", {
      listaErros: null, dadosNotificacao: null, autenticado:req.session.autenticado, valoresper: {
        id: null,  user: "", nick: "", email: "", num: "", cpf: ""
      }
    })
  }
});
router.get("/sair", limparSessao, function (req, res) {
  res.redirect("/");
});

router.get("/excluir", verificarUsuAutenticado, async function (req, res) {
  try{
    let deleta = await usuarioDAL.delete(req.session.autenticado.id);
    console.log(deleta);
    res.redirect("/sair");
  } catch(e) {
    console.log(e);
    res.render("pages/404", {autenticado:req.session.autenticado});
  }
});

// router.post("/cadastrar",

//     body("nome").isLength({min:3, max:20}),
//     body("nick").isLength({min:4, max:20}),
//     body("email").isEmail(),
//     body("repsenha").equals(body("senha")),
//     body("cpf").isLength({min:8}),
//     body("num").isNumeric(),
//     body("datanasc").isDate(),
    

//   function (req, res){
//     const errors= validationResult(req);

//     if (!errors.isEmpty()){
//       console.log(errors);
//       return res.json(errors);
//     }

//     var dadosForm = {
//       nome_do_perfil: req.body.user,
//       apelido_do_usuario: req.body.nick,
//       email: req.body.email,
//       senha_do_usuario: req.body.senha,
//       cpf_do_usuario: req.body.cpf,
//       telefone_do_usuario: req.body.num,
//       data_de_nascimento: req.body.datanasc,
//       genero: req.body.genero,

//     };

//     conexao.query(
//       "INSERT INTO usuario SET ?",
//       dadosForm,
//       function (error, results, fields){
//         if(error) throw error;
//       }
//     );

//     res.redirect("/")
//   }
// )
router.post("/cadastrar",

  body("user")
    .isLength({ min: 3, max: 25 }).withMessage("Digite um nome válido"),
  body("nick")
    .isLength({ min: 3, max: 25 }).withMessage("O nome de usuário deve ter de 3 a 25 caracteres"),
  body("email")
    .isEmail().withMessage("E-mail inválido ou já cadastrado"),
  body("senha")
    .isStrongPassword().withMessage("Escolha uma senha mais forte. Ex: 8nd5?4eCJ@"),
  body("datanasc")
    .isISO8601('yyyy-mm-dd').withMessage("Você deve ter mais que 18 anos"),
  async function (req, res) {
    var dadosForm = {
      senha_do_usuario: bcrypt.hashSync(req.body.senha, salt),
      data_de_nascimento: req.body.datanasc,
      email: req.body.email,
      nome_do_perfil: req.body.user,
      apelido_do_usuario: req.body.nick,
      genero: req.body.genero,
      cpf_do_usuario: req.body.cpf,
      telefone_do_usuario: req.body.num
    };
    const erros = validationResult(req);
    if (!erros.isEmpty()) {
      return res.render("pages/login", {autenticado:req.session.autenticado, listaErros: erros, valores: req.body, valoresper: {id: null,user: "", nick: "", email: "", num: "", cpf: ""}, listaErroslog: null })
    }
    try {
      let create = await usuarioDAL.create(dadosForm);
      console.log(create);
      res.redirect("/login")
    } catch (e) {
      console.log(e);
      res.render("pages/login", {autenticado:req.session.autenticado, listaErros:null, valores: req.body, valoresper: {id: null, user: "", nick: "", email: "", num: "", cpf: ""}, listaErroslog: null  })
    }
  }
);

router.post("/cadperfil", verificarUsuAutenticado, upload.single('fotoperfil'),
  body("nomeed")
    .isLength({ min: 3, max: 25 }).withMessage("Mínimo de 3 letras e máximo de 50!"),
  body("apelidoed")
    .isLength({ min: 3, max: 25 }).withMessage("Nome de usuário deve ter de 8 a 30 caracteres!"),
  body("numeroed")
    .isLength({ min: 5, max: 13 }).withMessage("Digite um telefone válido!"),
    
  async function (req, res) {
    const erros = validationResult(req);
    console.log(erros)
    if (!erros.isEmpty()) {
      return res.render("pages/cadperfil", {autenticado:req.session.autenticado, listaErros: erros, dadosNotificacao: null, valores: req.body })
    }
    try {
      var dadosForm = {
        apelido_do_usuario: req.body.apelidoed,
        nome_do_perfil: req.body.nomeed,
        telefone_do_usuario: req.body.numeroed,
        img_perfil_pasta: req.session.autenticado.img_perfil_pasta
      };
      if (!req.file) {
        console.log("Falha no carregamento");
      } else {
        caminhoArquivo = "imagens/perfil/" + req.file.filename;
        dadosForm.img_perfil_pasta = caminhoArquivo
      }
      console.log(dadosForm);

      let resultUpdate = await usuarioDAL.update(dadosForm, req.session.autenticado.id);
      if (!resultUpdate.isEmpty) {
        if (resultUpdate.changedRows == 1) {
          var result = await usuarioDAL.findID(req.session.autenticado.id);
          console.log('aaabbbccc')
          console.log(result)
          var autenticado = {
            autenticado: result[0].nome_do_perfil,
            id: result[0].id_usuario,
            img_perfil_pasta: result[0].img_perfil_pasta
          };
          req.session.autenticado = autenticado;
          //res.render("pages/perfil", { autenticado: req.session.autenticado, listaErros: null, valoresper:campos, dadosNotificacao: { titulo: "Perfil! atualizado com sucesso", mensagem: "", tipo: "success" }, valores: campos });
          res.redirect('/perfil')
        }
      }
    } catch (e) {
      console.log(e)
      res.render("pages/login", {
        autenticado:req.session.autenticado, listaErros: erros, valoresper: { id: null,  user: "", nick: "", email: "", num: "", cpf: "" },
      dadosNotificacao: { titulo: "Erro ao atualizar o perfil!",
      mensagem: "Verifique os valores digitados!", tipo: "error" },
      valores: req.body })
    }
  }
);
router.post("/entrar",

  body("usuario")
    .isLength({ min: 3, max: 45 })
    .withMessage("O campo deve ser preenchido"),
  body("senhalog")
    .isStrongPassword()
    .withMessage("Usuário ou senha incorretos"),

  gravarUsuAutenticado(usuarioDAL, bcrypt),
  function (req, res) {
    const erros = validationResult(req);
    if (!erros.isEmpty()) {
      return res.render("pages/login", {autenticado:req.session.autenticado, listaErroslog: erros, listaErros: null, valores: req.body, valoresper: { id: null,  user: "", nick: "", email: "", num: "", cpf: "" }})
    }
    if (req.session.autenticado.id != null) {
      console.log(req.session.autenticado)
      //mudar para página de perfil quando existir
      res.redirect("/perfil");
    } else {
      //res.render("pages/login", {autenticado:req.session.autenticado, listaErroslog: erros, listaErros: null, valores: req.body, valoresper: { id: null,  user: "", nick: "", email: "", num: "", cpf: "" } })
      res.redirect('/login')
    }
  }
);



//Rota de Cadastro
module.exports = router;

