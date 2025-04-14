const jwt = require('jsonwebtoken');
 function assinar(usuario){
    const token = jwt.sign({usuario},process.env.CHAVE_SECRETA,{expiresIn:'6h'})
    return token;

}

 function verificarAssinatura(token){
    return jwt.verify(token,process.env.CHAVE_SECRETA)
}

 module.exports = {assinar,verificarAssinatura}
