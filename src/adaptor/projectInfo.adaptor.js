export const projectInfoFormat = (original)=>{
    return {
        buguid: original.BUGUID,
        level: original.Level,
        levelCode: original.LevelCode,
        zb: original.zb,
        levelParentCode: original.LevelParentCode,
        projGUID: original.ProjGUID,
        projName: original.项目名称,
        // projName: original.ProjName,
        children: original.children
    }
}