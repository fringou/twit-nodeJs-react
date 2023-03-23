exports.signUpError = ( err ) =>{
    let errors = {pseudo : '', email: '' , password: ''};

    if ( err.message.includes('pseudo'))
    errors.pseudo = 'Pseudo incorrect ou déja attribuer'
    
    if ( err.message.includes('email'))
    errors.email = 'email incorrect ou déja enregistrer'

    if ( err.message.includes('password'))
    errors.password = 'password incorrect : le mot de passe doit avoir 12 caractères minimum'

    return errors;
};
