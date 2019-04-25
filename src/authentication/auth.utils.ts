export function AddRemoveRole(roles: string, role: string, removing?: boolean): string {
    roles = roles.replace(/^\-/, "").replace(/\-$/, "");
    let rolesArr = roles.split("-");

    if (removing) {
        const index = rolesArr.indexOf(role);
        const newRolesArr = rolesArr.splice(index, 1);
        return newRolesArr.join("-");
    }

    const index = rolesArr.indexOf(role);

    if (index > -1) {
        return rolesArr.join("-");
    }

    rolesArr.push(role);
    return rolesArr.join("-");
}