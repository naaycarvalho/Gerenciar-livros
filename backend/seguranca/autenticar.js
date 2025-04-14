const {assinar,verificarAssinatura} = require('./funcoesJWT');

 function login(req, resp){
const { usuario,senha}= req.body;


if(usuario ==='admin' && senha==='admin'){//lembre-se de verificar com  uma consulta  no banco
 //usuário autenticado
 resp.status(200).json({
  status:true,
  mensagem:"Logado com sucesso!",
  token:assinar({usuario,senha,perfil:'admin'})
  })


}else if(usuario ==='estudante' && senha==='123'){
  //usuário autenticado
  resp.status(200).json({
   status:true,
   mensagem:"Logado com sucesso!",
   token:assinar({usuario,senha,perfil:'estudante'})
   })
 
 
 }else{
  
     resp.status(401).json({
         status:false,
         mensagem:"Usuário ou senha inválidos!"
     })
 }






}

function verificarAutenticacao (allowedRoles=null) {

  return (req,resp,next)=>{


    const token =req.headers['authorization'];
    let tokenVerificado = undefined;
  
    if(token){
       tokenVerificado =verificarAssinatura(token);
  
       if(tokenVerificado!=undefined){
          

        if(allowedRoles!==null){

          const normalizedUserRole = (tokenVerificado.perfil || '').trim().toLowerCase();
          const normalizedAllowedRoles = Array.isArray(allowedRoles)? allowedRoles.map(role => role.trim().toLowerCase())
          : [allowedRoles.trim().toLowerCase()];

          if (!normalizedAllowedRoles.includes(normalizedUserRole)) {

            return resp.status(403).json({
              status: false,
              mensagem: 'Acesso negado. Você não tem permissão para acessar este recurso.'
            });
          }


        }









         next();
       } else{
          resp.status(401).json(
              {
                  status: false,
                  mensagem: 'Acesso não autorizado! Faça o login na aplicação!'
              });
       }
    }else{
      resp.status(401).json(
          {
              status: false,
              mensagem: 'Acesso não autorizado! Faça o login na aplicação!'
          });
  
    }


  }





}


module.exports={login,verificarAutenticacao}


