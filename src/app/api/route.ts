// import { useParams } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

const dict: any = {};

export async function POST(req: NextRequest) {
  console.log("1 here");

  try {
    const data = await req.json();

    if (!data || !data.message) {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }
    console.log("2 here", data);
    // Store log entries as structured objects
    const logEntries = data.message.toolCalls || [];
    const id = logEntries[0].id;
    console.log("logEntries", logEntries);

    console.log("logEntries.id", logEntries.id);

    dict["id"] = logEntries;
    // Use JSON.stringify to log the entire structure properly
    console.log("Stored Log Entries:", JSON.stringify(logEntries, null, 2));
    return NextResponse.json(
      {
        message: "Data received successfully",
        logs: logEntries,
        fullresponse: data,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error handling request:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

//GET Request
export async function GET(req: NextRequest) {
  try {
    return Response.json({
      // data: dict[callId],
      messsage: "This is a default response",
      data: dict["id"],
    });
  } catch (error) {
    console.error("Error handling request:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
