import inquirer from "inquirer";
function generatStudentId() {
    let id = Math.floor(1000 + Math.random() * 90000);
    return id;
}
let studentDetails;
let message = "Please fill the enroll form....";
let studentsEnrollmentDetails = [];
let remainingFee;
while (true) {
    let selectOperation = await inquirer.prompt({
        name: "whatYouSee",
        message: "What you Want?",
        type: "list",
        choices: [
            "Enroll Student",
            "View Student Status",
            "Pay Fees",
            "View Balance",
            "Exit",
        ],
    });
    if (selectOperation.whatYouSee === "Enroll Student") {
        let enrollSelection = await inquirer.prompt({
            name: "courseSelection",
            message: "Select Course you want to enroll:",
            type: "list",
            choices: [
                "Digital Marketing",
                "Web Development",
                "MS Office",
                "Application Development",
                "Digital Trading",
            ],
        });
        console.log(message);
        let fillEnrollForm = await inquirer.prompt([
            {
                name: "q1",
                type: "input",
                message: "Enter Student Name:",
            },
            {
                name: "q2",
                type: "input",
                message: "Enter Father Name:",
            },
            {
                name: "q3",
                type: "number",
                message: "Enter Phone No.",
            },
            {
                name: "q4",
                message: "Select Your Class Days",
                type: "list",
                choices: ["Monday-Wednesday-Friday", "Tuesday-Thursday-Saturday"],
            },
            {
                name: "q5",
                message: "Select Your Class Timing:",
                type: "list",
                choices: ["3:00 to 5:00", "6:00 to 8:00", "8:30 to 10:30"],
            },
        ]);
        console.log(`Your student ID numner is: ${generatStudentId()}`);
        let studentId = generatStudentId();
        studentDetails = {
            Course: enrollSelection.courseSelection,
            studentId: studentId,
            name: fillEnrollForm.q1,
            fatherName: fillEnrollForm.q2,
            phoneNumber: fillEnrollForm.q3,
            days: fillEnrollForm.q4,
            timing: fillEnrollForm.q5,
        };
        studentsEnrollmentDetails.push(studentDetails);
    }
    //            "View Student Status" If Block Start 
    else if (selectOperation.whatYouSee === "View Student Status") {
        console.log(`Enrollment Details`);
        console.log(studentsEnrollmentDetails);
    }
    else if (selectOperation.whatYouSee === "Pay Fees") {
        let studentIds = studentsEnrollmentDetails.map(student => student.studentId);
        let feePaymentForm = await inquirer.prompt([
            {
                name: "choseStudentId",
                message: "Select student Id number:",
                type: "list",
                choices: studentIds,
            }
        ]);
        if (studentIds.includes(feePaymentForm.choseStudentId)) {
            let payingFee = await inquirer.prompt([
                {
                    name: "feeAmount",
                    message: "Enter Fee amount:",
                    type: "number",
                },
                {
                    name: "confirmation",
                    message: "Are you sure to paying fee:",
                    type: "confirm",
                }
            ]);
            // Stundart Fee Amount
            remainingFee = 15000 - payingFee.feeAmount;
            console.log(`Successfully paid fee: ${payingFee.feeAmount}`);
            console.log(`Your remaining fee amount is: ${remainingFee}`);
        }
        else {
            console.log("Its not Work!!!!!");
        }
    }
    else if (selectOperation.whatYouSee === "View Balance") {
        console.log(`I don't known how it is work!!!`);
    }
    else if (selectOperation.whatYouSee === "Exit") {
        console.log(`Exiting.....`);
        break;
    }
    else {
        break;
    }
}
