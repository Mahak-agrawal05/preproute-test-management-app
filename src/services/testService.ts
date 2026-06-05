import api from "./api";

export const createTest = async (testData: any) => {
  const response = await api.post("/tests", testData);
  return response.data;
};

export const getSubjects = async () => {
  const response = await api.get("/subjects");
  return response.data;
};

export const getTopicsBySubject = async (
  subjectId: string
) => {
  const response = await api.get(
    `/topics/subject/${subjectId}`
  );

  return response.data;
};

export const getSubTopicsByTopic = async (
  topicId: string
) => {
  const response = await api.get(
    `/sub-topics/topic/${topicId}`
  );

  return response.data;
};