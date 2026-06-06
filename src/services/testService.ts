import api from "./api";

export const createTest = async (testData: any) => {
  const token = localStorage.getItem("token");

  const response = await api.post(
    "/tests",
    testData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const updateTest = async (
  testId: string,
  testData: any
) => {
  const token = localStorage.getItem("token");

  const response = await api.put(
    `/tests/${testId}`,
    testData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const getSubjects = async () => {
  const response = await api.get("/subjects");
  return response.data;
};

export const getTopicsBySubject = async (
  subjectId: string
) => {
  const token = localStorage.getItem("token");

  const response = await api.get(
    `/topics/subject/${subjectId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const getSubTopicsByTopicList =
  async (topicIds: string[]) => {

    const token =
      localStorage.getItem("token");

    const response = await api.post(
      "/sub-topics/multi-topics",
      {
        topicIds,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  };

export const getTests = async () => {
  const token = localStorage.getItem("token");

  const response = await api.get("/tests", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const getTestById = async (
  testId: string
) => {
  const token = localStorage.getItem("token");

  const response = await api.get(
    `/tests/${testId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const bulkCreateQuestions = async (
  questionsData: any
) => {
  const token = localStorage.getItem("token");

  const response = await api.post(
    "/questions/bulk",
    questionsData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const publishTest = async (
  testId: string
) => {
  const token = localStorage.getItem("token");

  const response = await api.put(
    `/tests/${testId}`,
    {
      status: "live",
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const fetchBulkQuestions = async (
  questionIds: string[]
) => {

  const token =
    localStorage.getItem("token");

  const response = await api.post(
    "/questions/fetchBulk",
    {
      question_ids: questionIds,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};