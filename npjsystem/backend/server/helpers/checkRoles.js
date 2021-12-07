const db = require("../models");

exports.check = function(route, method, roles){
    var auth = true;

    if(route.indexOf("roles") > -1){
        if(method == "GET"){
            auth = authenticator(roles, db.ROLES.READ_ROLE);
        }
        else if(method == "POST"){
            auth = authenticator(roles, db.ROLES.CREATE_ROLE);
        }
        else if(method == "PUT"){
            auth = authenticator(roles, db.ROLES.UPDATE_ROLE);
        }
        else if(method == "DELETE"){
            auth = authenticator(roles, db.ROLES.DELETE_ROLE);
        }
    }
    else if(route.indexOf("profiles") > -1){
        if(method == "GET"){
            auth = authenticator(roles, db.ROLES.READ_PROFILE);
        }
        else if(method == "POST"){
            auth = authenticator(roles, db.ROLES.CREATE_PROFILE);
        }
        else if(method == "PUT"){
            auth = authenticator(roles, db.ROLES.UPDATE_PROFILE);
        }
        else if(method == "DELETE"){
            auth = authenticator(roles, db.ROLES.DELETE_PROFILE);
        }
    }
    else if(route.indexOf("users") > -1){
        if(method == "GET"){
            auth = authenticator(roles, db.ROLES.READ_USER);
        }
        else if(method == "POST"){
            auth = authenticator(roles, db.ROLES.CREATE_USER);
        }
        else if(method == "PUT"){
            auth = authenticator(roles, db.ROLES.UPDATE_USER);
        }
        else if(method == "DELETE"){
            auth = authenticator(roles, db.ROLES.DELETE_USER);
        }
    }
    else if(route.indexOf("processTypes") > -1){
        if(method == "GET"){
            auth = authenticator(roles, db.ROLES.READ_PROCESS_TYPE);
        }
        else if(method == "POST"){
            auth = authenticator(roles, db.ROLES.CREATE_PROCESS_TYPE);
        }
        else if(method == "PUT"){
            auth = authenticator(roles, db.ROLES.UPDATE_PROCESS_TYPE);
        }
        else if(method == "DELETE"){
            auth = authenticator(roles, db.ROLES.DELETE_PROCESS_TYPE);
        }
    }
    else if(route.indexOf("processChecklists") > -1){
        if(method == "GET"){
            auth = authenticator(roles, db.ROLES.READ_PROCESS_CHECKLIST);
        }
        else if(method == "POST"){
            auth = authenticator(roles, db.ROLES.CREATE_PROCESS_CHECKLIST);
        }
        else if(method == "PUT"){
            auth = authenticator(roles, db.ROLES.UPDATE_PROCESS_CHECKLIST);
        }
        else if(method == "DELETE"){
            auth = authenticator(roles, db.ROLES.DELETE_PROCESS_CHECKLIST);
        }
    }
    else if(route.indexOf("arquivar") > -1){
        if(method == "POST"){
            auth = authenticator(roles, db.ROLES.FILE_PROCESS);
        }
    }
    else if(route.indexOf("processes") > -1){
        if(method == "GET"){
            auth = authenticator(roles, db.ROLES.READ_PROCESS);
        }
        else if(method == "POST"){
            auth = authenticator(roles, db.ROLES.CREATE_PROCESS);
        }
        else if(method == "PUT"){
            auth = authenticator(roles, db.ROLES.UPDATE_PROCESS);
        }
        else if(method == "DELETE"){
            auth = authenticator(roles, db.ROLES.DELETE_PROCESS);
        }
    }
    else if(route.indexOf("documents/upload") > -1){
        if(method == "POST"){
            auth = authenticator(roles, db.ROLES.UPLOAD_DOCUMENT);
        }
    }
    else if(route.indexOf("documents/download") > -1){
        if(method == "GET"){
            auth = authenticator(roles, db.ROLES.DOWNLOAD_DOCUMENT);
        }
    }
    else if(route.indexOf("documents") > -1){
        if(method == "POST"){
            auth = authenticator(roles, db.ROLES.CREATE_DOCUMENT);
        }
        if(method == "PUT"){
            auth = authenticator(roles, db.ROLES.UPDATE_DOCUMENT);
        }
    }
    else if(route.indexOf("customers") > -1){
        if(method == "GET"){
            auth = authenticator(roles, db.ROLES.READ_CUSTOMER);
        }
        else if(method == "POST"){
            auth = authenticator(roles, db.ROLES.CREATE_CUSTOMER);
        }
        else if(method == "PUT"){
            auth = authenticator(roles, db.ROLES.UPDATE_CUSTOMER);
        }
        else if(method == "DELETE"){
            auth = authenticator(roles, db.ROLES.DELETE_CUSTOMER);
        }
    }
    else if(route.indexOf("consultations") > -1){
        if(method == "GET"){
            auth = authenticator(roles, db.ROLES.READ_CONSULTATION);
        }
        else if(method == "POST"){
            auth = authenticator(roles, db.ROLES.CREATE_CONSULTATION);
        }
        else if(method == "PUT"){
            auth = authenticator(roles, db.ROLES.UPDATE_CONSULTATION);
        }
        else if(method == "DELETE"){
            auth = authenticator(roles, db.ROLES.DELETE_CONSULTATION);
        }
    }
    else if(route.indexOf("systemLogs") > -1){
        if(method == "GET"){
            auth = authenticator(roles, db.ROLES.READ_SYSTEM_LOG);
        }
        else if(method == "POST"){
            auth = authenticator(roles, db.ROLES.CREATE_SYSTEM_LOG);
        }
    }
    else if(route.indexOf("processMovements") > -1){
        if(method == "GET"){
            auth = authenticator(roles, db.ROLES.READ_PROCESS_MOVEMENTS);
        }
        else if(method == "POST"){
            auth = authenticator(roles, db.ROLES.CREATE_PROCESS_MOVEMENTS);
        }
    }

    if(auth){
        return true;
    }else{
        return false;
    }
}

authenticator = function(roles, necessaryRole){
    var isAuth = false;

    roles.map((role, i) => {
        if(role.name == necessaryRole){
            isAuth = true;
        }
    });
    
    return isAuth;
}