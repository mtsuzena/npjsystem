const profilesData = require('../datas/profile.data.js');

exports.getProfiles = function () {
    return profilesData.getProfiles();
}


exports.getProfile = function (id) {
    return profilesData.getProfile(id);
}

exports.saveProfile = async function (profile) {
    const existingProfile = await profilesData.getProfileByName(profile.name);
    if (existingProfile) throw new Error('Profile already exists');
    return profilesData.saveProfile(profile)
}

exports.deleteProfile = async function (id) {
    const existingProfile = await profilesData.getProfile(id)
    if (!existingProfile) throw new Error('Profile not found');
    return profilesData.deleteProfile(id)
}

exports.updateProfile = async function (id, profile) {
    const existingProfile = await profilesData.getProfile(id)
    if (!existingProfile) throw new Error('Profile not found');
    existingProfile.name = profile.name;
    existingProfile.description = profile.description;
    return profilesData.updateProfile(existingProfile);
}

