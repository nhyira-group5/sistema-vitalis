import { useEffect, useState } from "react";
import { api } from "../../api";
import { getLoginResponse } from "@utils/globalFunc";

export function ReminderMessage({ texto, data }) {
  function formatISODateToDDMM(isoDateString) {
    const date = new Date(isoDateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");

    return `${day}/${month}`;
  }

  return (
    <div className="bg-white text-black rounded-xl py-3 px-2 relative min-h-20 break-words overflow-hidden text-sm">
      {texto}{" "}
      <span className="text-gray-600 text-xs absolute bottom-1 right-3">
        {formatISODateToDDMM(data)}
      </span>
    </div>
  );
}

export function Reminder() {
  const [reminders, setReminders] = useState(null);
  const [textAreaValue, setTextAreaValue] = useState("");
  const [textAreaVisible, setTextAreaVisible] = useState(false);

  useEffect(() => {
    fetchReminders();
  }, []);

  function createReminder() {
    setTextAreaVisible(true);
  }

  async function salveReminder() {
    if (textAreaValue.length > 0) {
      const response = await postReminder(bodyRequest);
      console.log(response);

      if (response !== null) {
        setReminders((prev) => [
          ...prev,
          { conteudo: response.conteudo, dataLembrete: response.dataLembrete },
        ]);
        hiddenCreationReminder();
      }
    }
  }

  function hiddenCreationReminder() {
    setTextAreaValue("");
    setTextAreaVisible(false);
  }

  const bodyRequest = {
    conteudo: textAreaValue,
    dataLembrete: new Date().toISOString(),
    usuarioId: getLoginResponse().id,
  };

  const postReminder = async (bodyRequest) => {
    let json;
    try {
      const response = await api.post(`/lembretes`, bodyRequest);
      console.log(response.data);
      json = response.data;
    } catch (e) {
      console.error("Error in POST request:", e);
    }

    return json;
  };

  const fetchReminders = async () => {
    const login = getLoginResponse();
    try {
      const response = await api.get(`/lembretes/${login.id}`);
      setReminders(response.data);
    } catch (e) {
      console.error("Error in GET request:", e);
    }
  };

  return (
    <div className="w-[20%] h-full bg-[#1A1A1A] flex flex-col justify-between items-center rounded-xl shadow-lg px-5 py-6">
      <h1 className="text-white text-xl font-semibold text-center mb-6">
        Lembretes
      </h1>
      <div className="h-5/6 flex flex-col gap-2 overflow-y-auto w-full">
        {textAreaVisible && (
          <TextArea
            textAreaValue={textAreaValue}
            setTextAreaValue={setTextAreaValue}
          />
        )}
        {reminders !== null && reminders.length > 0 || textAreaVisible === true  ? (
          reminders.map((r, index) => {
            return (
              <ReminderMessage
                key={index}
                texto={r.conteudo}
                data={r.dataLembrete}
              />
            );
          })
        ) : (
          <div className="w-full h-full flex justify-center items-center text-white text-sm font-small ">
            Nenhum lembrete adicionado.
          </div>
        )}
      </div>
      {textAreaVisible ? (
        <div className="flex gap-5">
          <button
            // className="px-9 py-2 rounded-2xl shadow-lg text-sm text-white bg-[#48B75A] hover:opacity-90"
            className="px-3 py-1.5 bg-red-500  rounded-2xl text-white text-sm hover:opacity-90"
            onClick={hiddenCreationReminder}
          >
            Cancelar
          </button>

          <button
            className="px-3 bg-green-500  rounded-2xl text-white text-sm hover:opacity-90 "
            onClick={salveReminder}
          >
            Salvar
          </button>
        </div>
      ) : (
        <button
          className="px-9 py-2 rounded-2xl shadow-lg text-sm text-white bg-[#48B75A] hover:opacity-90"
          onClick={createReminder}
          disabled={textAreaVisible}
        >
          Adicionar lembrete
        </button>
      )}
    </div>
  );
}

export function TextArea({ textAreaValue, setTextAreaValue }) {
  return (
    <textarea
      id="name"
      rows={1}
      cols={2}
      maxLength={48}
      className="min-h-20 outline-none resize-none leading-tight px-2 py-3 rounded-xl text-sm"
      placeholder="Digite aqui seu texto..."
      value={textAreaValue}
      onChange={({ target }) => setTextAreaValue(target.value)}
    ></textarea>
  );
}
