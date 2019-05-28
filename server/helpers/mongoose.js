module.exports = {
    normailiseErrors: function(errors) {
        let normailiseErrors = [];
        for(propery in errors ) {
            if(errors.hasOwnProperty(propery)){
                normailiseErrors.push({title: propery, detail: errors[propery].message})
            }
        }

        return normailiseErrors;
    }
}