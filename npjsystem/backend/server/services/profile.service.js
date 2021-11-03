const profilesData = require('../datas/profile.data.js');

exports.getProfiles = function () {
    return profilesData.getProfiles();
}


exports.getProfile = function (id) {
    return profilesData.getProfile(id);
}

exports.saveProfile = async function (data) {
    const { roles, ...profile } = data;

    const existingProfile = await profilesData.getProfileByName(profile.name);
    if (existingProfile) throw new Error('Profile already exists');

    if (roles && roles.length > 0){
        return profilesData.saveProfileWithRoles(profile, roles);
    }else{
        return profilesData.saveProfile(profile);
    }
}

exports.deleteProfile = async function (id) {
    const existingProfile = await profilesData.getProfile(id);
    if (!existingProfile) throw new Error('Profile not found');
    return profilesData.deleteProfile(id);
}

exports.updateProfile = async function (id, data) {
    const { roles, ...profile } = data;

    const existingProfile = await profilesData.getProfile(id);
    if (!existingProfile) throw new Error('Profile not found');

    existingProfile.name = profile.name;
    existingProfile.description = profile.description;

    // Identifcando se foi removido alguma role
    let rolesParaRemover = [];
    existingProfile.roles.forEach((role) => {
        const found = roles.find(element => element === role.id);
        if(!found){
            rolesParaRemover.push(role.id)
        }
    })

    let rolesParaAdicionar = [];
    roles.forEach((role) => {
        const found = existingProfile.roles.find(element => element.id === role);
        if(!found){
            rolesParaAdicionar.push(role)
        }
    })

    // Caso alguma role foi removida, deletar da base
    if(rolesParaRemover){
        existingProfile.removeRole(rolesParaRemover);
    }

    // Caso alguma role foi adicionada, salvar na base
    if(rolesParaAdicionar){
        existingProfile.addRole(rolesParaAdicionar);
    }

    return profilesData.updateProfile(existingProfile);
}

