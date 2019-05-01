export function AddRemoveRole(roles: string, role: string, removing?: boolean): string {
    roles = roles.replace(/^\-/, '').replace(/\-$/, '');
    const rolesArr = roles.split('-');

    if (removing) {
        const indexOfRole = rolesArr.indexOf(role);
        const newRolesArr = rolesArr.splice(indexOfRole, 1);
        return newRolesArr.join('-');
    }

    const index = rolesArr.indexOf(role);

    if (index > -1) {
        return rolesArr.join('-');
    }

    rolesArr.push(role);
    return rolesArr.join('-');
}

export function GetRoles(roles: string): string[] {
    roles = roles.replace(/^\-/, '').replace(/\-$/, '');
    const rolesArr = roles.split('-');

    return rolesArr;
}
