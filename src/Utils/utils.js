


export const firstQuestionDescription = `Choose a type of your area.`
  
export const secondQuestionDescription = `Choose service type of your project. Custom: you choose specifications of equipment;
                                        Standard: just choose Low / Medium / High quality of equipment and we will set everything up for you!`

export const thirdQuestionDescription = `Choose equipment you want to be installed in your area.`

export const setCamerasSpecs = (level, quantity) => {
    if (level === "Low") {
        return { 
            res: '720x480', 
            type: 'Static', 
            storageTime: '24h',
            quantity: Math.ceil(quantity / 8) 
        }
    } else if (level === "Medium") {
        return { 
            res: '1280x720', 
            type: 'Moving', 
            storageTime: '7d',
            quantity: Math.ceil(quantity / 4) 
        }
    } else if (level === "High") {
        return { 
            res: '1920x1080', 
            type: 'Moving', 
            storageTime: '1m',
            quantity: Math.ceil(quantity / 2) 
        }
    }
}

export const setFireAlarmsSpecs = (level, quantity) => {
    if (level === "Low") {
        return { 
            reactionType: 'Smoke', 
            reactionTime: '1min', 
            warningType: 'Sound Warning, Regular Procedure',
            quantity: Math.floor(quantity / 16) 
        }
    } else if (level === "Medium") {
        return { 
            reactionType: 'Smoke & Temperature change sensor', 
            reactionTime: '30s', 
            warningType: 'Sound Warning, Mobile App Notification, Regular Procedure',
            quantity: Math.floor(quantity / 8) 
        }
    } else if (level === "High") {
        return { 
            reactionType: 'Smoke & Temperature change sensor', 
            reactionTime: '10s', 
            warningType: 'Sound Warning, Mobile App Notification & Direct Notification To Authorities, Regular Procedure',
            quantity: Math.floor(quantity / 4) 
        }
    }
}

export const equipmentPrices = {
    camerasBasicPrice: 300,
    fireAlarmsBasicPrice: 150,
    doorLocksBasicPrice: 75
}

export const setDoorLocksSpecs = (level) => {
    if (level === "Low") {
        return { 
            lockType: 'Code', 
            signalization: 'Sound', 
            unlockingType: 'Key'
        }
    } else if (level === "Medium") {
        return { 
            lockType: 'Finger print scan', 
            signalization:  'Sound (too many tries, set by customer), Phone notification', 
            unlockingType: 'From phone app / Key / Finger print (set by customer)'
        }
    } else if (level === "High") {
        return { 
            lockType: 'Finger print scan', 
            signalization: "Sound (too many tries, set by customer), Phone notification, Direct notification to authorities", 
            unlockingType: 'From phone app / Key / Finger print (set by customer)'
        }
    }
}

export const getEqSpecsChoice = (eqName, quantity) => {
    if (eqName === "Cameras") {
        const camLSpecs = setCamerasSpecs("Low", quantity)
        const camMSpecs = setCamerasSpecs("Medium", quantity)
        const camHSpecs = setCamerasSpecs("High", quantity)
        return {
            eqName: "Cameras",
            specNames: ["Resolution", "Cameras Type", "Data Storage Time", "Video Coverage"],
            specs: [
                [`Low ${camLSpecs.res}`, `Medium ${camMSpecs.res}`, `High ${camHSpecs.res}`], 
                [`Static`, `Moving`],
                [`24h`, `7d`, `1m`],
                [`Low: ${camLSpecs.quantity}`, `Medium: ${camMSpecs.quantity}`, `High: ${camHSpecs.quantity}`]
            ]
        }
    } 
    else if (eqName === "Fire Alarms") {
        const faLSpecs = setFireAlarmsSpecs("Low", quantity)
        const faMSpecs = setFireAlarmsSpecs("Medium", quantity)
        const faHSpecs = setFireAlarmsSpecs("High", quantity)
        return {
            eqName: "Fire Alarms",
            specNames: ["Reaction Type", "Reaction Time", "Warning Type", "Alarm Coverage"],
            specs: [
                [`${faLSpecs.reactionType}`, `${faMSpecs.reactionType}`], 
                [`1min`, `30s`, `10s`],
                [`${faLSpecs.warningType}`, `${faMSpecs.warningType}`, `${faHSpecs.warningType}`],
                [`Low: ${faLSpecs.quantity}`, `Medium: ${faMSpecs.quantity}`, `High: ${faHSpecs.quantity}`]
            ]
        }
    } else if (eqName === "Door Locks") {
        const dlLSpecs = setDoorLocksSpecs("Low", quantity)
        const dlMSpecs = setDoorLocksSpecs("Medium", quantity)
        const dlHSpecs = setDoorLocksSpecs("High", quantity)
        return {
            eqName: "Door Locks",
            specNames: ["Lock Type", "Signalization", "Opportunities to Unlock"],
            specs: [
                [`${dlLSpecs.lockType}`, `${dlMSpecs.lockType}`], 
                [`${dlLSpecs.signalization}`,`${dlMSpecs.signalization}`, `${dlHSpecs.signalization}`],
                [`${dlLSpecs.unlockingType}`, `${dlMSpecs.unlockingType}`]
            ]
        }
    }

}
    