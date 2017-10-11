export function getBaseLocation() {
    let paths: string[] = location.pathname.split('/').splice(1, 1);
    let basePath: string = paths.length? paths[0]:""
    return '/';
}