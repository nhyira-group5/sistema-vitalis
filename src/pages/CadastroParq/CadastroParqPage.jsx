import { Select } from '@components/Select/select';
import { Button } from '@components/Button/button';
import { DisplayInput, Input } from '@components/Input/input';
import { api } from '../../api';
import { toast } from 'react-toastify';
import { useEffect, useState, useContext } from 'react';
import { validateLogin, validateUsuario } from '@utils/globalFunc';

import {
  formatarCPF,
  converterDataFormato,
} from '@utils/globalFunc';

import { Checkbox } from '@components/Checkbox/checkbox.jsx';

import { validatePeso, validateAltura } from '@utils/validacoes';

import { Ruler, Barbell } from '@phosphor-icons/react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../user-context'; 

function fichaDtoCriacao(userFormInfo) {

  const fichaDto = {
    problemaCardiaco: userFormInfo.problemasCardiacos,
    dorPeitoAtividade: userFormInfo.dorPeitoAtividade,
    dorPeitoUltimoMes: userFormInfo.dorPeitoUltimoMes,
    problemaOsseoArticular: userFormInfo.problemaOsseoArticular,
    medicamentoPressaoCoracao: userFormInfo.medicamentoPressaoCoracao,
    impedimentoAtividade: userFormInfo.impedimentoAtividade,
    altura: userFormInfo.altura,
    peso: userFormInfo.peso,
    usuarioId: userFormInfo.idUsuario,
  };

  return fichaDto;
}



export function CadastroParqPage() {

  const [modalAtivo, SetModalAtivo] = useState(false);

  const navigate = useNavigate();
  const {updateUser, user, loading, error} = useContext(UserContext);
  console.log(user)
  const redirecionarLogin = () => {
    navigate('/login');
  };

  const [metas, setMetas] = useState([]);
  // const [usuarioData, setUsuarioData] = useState({});

  const [isMetaSelecionado, setIsMetaSelecionado] = useState(true);

  const [isPesoValid, setIsPesoValid] = useState(true);
  const [isAlturaValid, setIsAlturaValid] = useState(true);

  const [isFormValid, setIsFormValid] = useState(true);
  const [formData, setFormData] = useState({
    peso: '',
    altura: '',
    metaId: null,
    metaNome: null,
    idUsuario: user.userData.id,
    rotinaAlternativa: 0,

    problemasCardiacos: 0,
    dorPeitoAtividade: 0,
    dorPeitoUltimoMes: 0,
    problemaOsseoArticular: 0,
    medicamentoPressaoCoracao: 0,
    impedimentoAtividade: 0,
  });

  const [splashActive, setSplashActive] = useState(false);
  
  function rotinaUsuarioDtoCriacao(userFormInfo) {
  
    if (userFormInfo.problemasCardiacos != 0 ||
      userFormInfo.dorPeitoAtividade != 0 ||
      userFormInfo.dorPeitoUltimoMes != 0 ||
      userFormInfo.problemaOsseoArticular != 0 ||
      userFormInfo.medicamentoPressaoCoracao != 0 ||
      userFormInfo.impedimentoAtividade != 0) {
        SetModalAtivo(true); 
      }
  
    const rotinaUsuarioDto = {
      metaId: +userFormInfo.metaId,
      usuarioId: userFormInfo.idUsuario,
      rotinaAlternativa: 0
    };
  
    return rotinaUsuarioDto;
  }

  function getMetas() {
    api
      .get(`/metas`)
      .then((response) => {
        setMetas([...metas, ...response.data]);
      })
      .catch((error) => {
        error.response.data.errors.forEach((erroMsg) => {
          console.log(erroMsg.defaultMessage);
        });
      });
  }

  // function getUsuarioResponse(id) {
  //   api
  //     .get(`/usuarios/${id}`)
  //     .then((response) => {
  //       setUsuarioData(response.data);
  //     })
  //     .catch((error) => {
  //       error.response.data.errors.forEach((erroMsg) => {
  //         console.log(erroMsg.defaultMessage);
  //       });
  //     });
  // }

  const encontrarMetaPeloId = (id, lista) => {
    const metaEncontrada = lista.find((meta) => meta.id === id);
    return metaEncontrada ? metaEncontrada.nome : 'Meta não encontrada';
  };

  useEffect(() => {
    const validarLoginEUsuario = async () => {
      
      await validateLogin(navigate, user);
      await validateUsuario(navigate, user);


      setFormData((prevState) => ({
        ...prevState,
        idUsuario: user.userData.id,
      }));

      // getUsuarioResponse(user.userData.id);
      getMetas();
    };

    validarLoginEUsuario();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const isPesoValid = validatePeso(formData.peso);
    const isAlturaValid = validateAltura(formData.altura);
    const isMetaSelecionado = formData.metaId && formData.metaId.trim() !== '';

    setIsPesoValid(isPesoValid);
    setIsAlturaValid(isAlturaValid);
    setIsMetaSelecionado(isMetaSelecionado);

    const isFormValid = isPesoValid && isAlturaValid && isMetaSelecionado;

    setIsFormValid(isFormValid);

    if (isFormValid) {
      try {
        setSplashActive(true);

        const fichaDto = fichaDtoCriacao(formData);
        const rotinaUsuarioDto = rotinaUsuarioDtoCriacao(formData);

        const rotinaUsuarioResponse = await api.post(`/rotinaUsuarios`, rotinaUsuarioDto);
        const fichaUsuarioResponse = await api.post(`/fichas`, fichaDto);

        let userData = JSON.parse(JSON.stringify(user))
        userData.userData.meta = rotinaUsuarioResponse.data.metaId;
        userData.userFicha = fichaUsuarioResponse.data;

        updateUser(userData);

        toast.success('Ficha criada com sucesso');

        console.log(modalAtivo)
        if (!modalAtivo) {
          navigate('/home');
        }
      } catch (error) {
        console.log(error);
        error.response.data.errors.forEach((erroMsg) => {
          toast.error(erroMsg.defaultMessage);
        });
      } finally {
        setSplashActive(false)
      }
    }
  };

  const handleChange = (event) => {
    const { name, value, checked, type } = event.target;

    if (type === 'checkbox') {
      const value = checked == true ? 1 : 0;

      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
    switch (name) {
      case 'metaId':
        const metaEncontrada = metas.find(
          (meta) => meta.id === parseInt(value, 10),
        );

        if (metaEncontrada) {
          setFormData((prevState) => ({
            ...prevState,
            metaNome: metaEncontrada.nome,
          }));
        }
        break;
      case 'peso':
        setIsPesoValid(true);
        break;
      case 'altura':
        setIsAlturaValid(true);
        break;

      default:
        break;
    }
  };

  const pesoErrorList = () => {
    return (
      <ul>
        <li>Insira um peso válido!</li>
      </ul>
    );
  };
  const alturaErrorList = () => {
    return (
      <ul>
        <li>Insira uma altura válida!</li>
      </ul>
    );
  };

  function voltaProSite() {
    navigate("/")
  }

  function vaiPraHome() {
    navigate("/home")
  }

  return (
    <>
      

      <div className="flex w-full h-screen justify-evenly items-center">
      {modalAtivo && 
      (
        <div className='absolute mx-auto my-0 max-w-96 text-white border-2 border-[#48B75A] p-8 rounded-2xl bg-black z-10 grid grid-cols-1 text-center gap-5'>
        {/* // <div className='absolute bg-white mx-auto my-0 max-w-prose p-4 rounded-xl z-10 grid grid-cols-[1fr_auto] place-content-start items-center gap-x-8 gap-y-4'> */}
          <h1>Cuidado com sua Saúde!</h1>
          <p>Percebemos que você tem uma condição de saúde que merece atenção. Para sua segurança, é importante evitar atividades físicas intensas sem orientação profissional.
          </p>
          <p>Recomendamos consultar um Personal Trainer para um plano seguro e eficaz.</p>
          <p>Como deseja proseguir?</p>
          <div className='flex justify-between'>
            <button className='p-2 bg-[#48B75A] rounded-lg text-sm' onClick={voltaProSite}>Aceito os riscos</button>
            <button className='p-2 bg-[#1B70CA] rounded-lg text-sm' onClick={vaiPraHome}>Quero pegar mais leve</button>
          </div>

          <p>Não nos responsabilizamos por quaisquer danos a saúde ou consequências derivadas dos exercícios remomendados pela plataforma.</p>
        </div>
      )}

        <div className="w-1/2 h-screen bg-gray500 py-16 px-11 flex flex-col text-white overflow-auto">
          <div className={`flex flex-col gap-3`}>
            <span className={`text-7xl font-bold text-primary-green300`}>
              Estamos quase lá
            </span>

            <div className="flex flex-col gap-1">
              <span className="text-lg font-normal">
                Antes de você acessar nosso sistema, informe algumas informações
                sobre você e sua saúde.
              </span>
            </div>
          </div>

          <form
            className={`lg:gap-y-10 lg:h-full lg:flex-col lg:overflow-auto lg:flex
                        xl:gap-x-16 xl:gap-y-10 xl:h-fit xl:grid-cols-2 xl:grid-flow-row xl:overflow-auto xl:grid xl:auto-rows-auto`}
          >
            <fieldset className="h-fit">
              <Input
                labelContent={'Peso em kg'}
                icon={<Barbell size={28} color="#000000" />}
                placeholder={'74kg'}
                nome={'peso'}
                value={formData.peso}
                onChangeFunction={handleChange}
                inputType={'number'}
                valid={!isPesoValid}
                invalidMessage={pesoErrorList}
              />
            </fieldset>
            <fieldset className="h-fit">
              <Input
                labelContent={'Altura em CM'}
                icon={<Ruler size={28} color="#000000" />}
                placeholder={'190cm'}
                nome={'altura'}
                value={formData.altura}
                onChangeFunction={handleChange}
                inputType={'number'}
                valid={!isAlturaValid}
                invalidMessage={alturaErrorList}
              />
            </fieldset>
            <fieldset className="col-span-2 h-fit">
              <Select
                options={metas}
                labelContent="Meta"
                onChangeFunction={handleChange}
                id="metaId"
                nome="metaId"
                valid={!isMetaSelecionado}
                placeholder={'Selecione uma meta'}
              />
            </fieldset>

            <fieldset className="col-span-2 grid auto-rows-auto grid-flow-row gap-y-3 h-full overflow-auto scrollbar-thin">
              <Checkbox
                onChangeFunction={handleChange}
                name={'problemasCardiacos'}
                Id={'problemasCardiacos'}
                labelcontent={
                  'Algum médico já disse que você possui algum problema de coração e que só deveria realizar atividade física supervisionado por profissionais de saúde?'
                }
              />
              <Checkbox
                onChangeFunction={handleChange}
                name={'dorPeitoAtividade'}
                Id={'dorPeitoAtividade'}
                labelcontent={
                  'Você sente dores no peito quando pratica atividade física?'
                }
              />
              <Checkbox
                onChangeFunction={handleChange}
                name={'dorPeitoUltimoMes'}
                Id={'dorPeitoUltimoMes'}
                labelcontent={
                  'No último mês, você sentiu dores no peito quando praticou atividade física?'
                }
              />
              <Checkbox
                onChangeFunction={handleChange}
                name={'problemaOsseoArticular'}
                Id={'problemaOsseoArticular'}
                labelcontent={
                  'Você possui algum problema ósseo ou articular que poderia ser piorado pela atividade física?'
                }
              />
              <Checkbox
                onChangeFunction={handleChange}
                name={'medicamentoPressaoCoracao'}
                Id={'medicamentoPressaoCoracao'}
                labelcontent={
                  'Você toma atualmente algum medicamento para pressão arterial e/ou problema de coração?'
                }
              />
              <Checkbox
                onChangeFunction={handleChange}
                name={'impedimentoAtividade'}
                Id={'ImpedimentoAtividade'}
                labelcontent={
                  'Sabe de alguma outra razão pela qual você não deve praticar atividade física?'
                }
              />
            </fieldset>
          </form>
        </div>

        <div className="w-1/2 h-screen bg-white py-16 px-11 flex flex-col text-white overflow-auto">
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-6 gap-y-3 gap-x-6 p-5  grid-flow-row auto-rows-auto bg-white shadow-[0px_0px_5px_0px_rgba(0,0,0,0.30)] w-full h-full"
          >
            <fieldset className="col-span-6">
              <DisplayInput
                labelContent={'Nome completo'}
                placeholder={'Nome completo do usuário'}
                nome={'nomeCompletoUsuario'}
                onChangeFunction={''}
                inputType={'text'}
                value={user.userData.nome ?? ''}
                disabled={true}
              />
            </fieldset>

            <fieldset className="col-span-2">
              <DisplayInput
                labelContent={'CPF'}
                placeholder={'CPF do usuário'}
                nome={'cpfUsuario'}
                onChangeFunction={''}
                inputType={'text'}
                value={formatarCPF(user.userData.cpf) ?? ''}
                disabled={true}
              />
            </fieldset>

            <fieldset className="col-span-2">
              <DisplayInput
                labelContent={'Dt. Nascimento'}
                placeholder={'--/--/----'}
                nome={'dtNascimentoUsuario'}
                onChangeFunction={''}
                inputType={'text'}
                value={converterDataFormato(user.userData.dtNasc) ?? ''}
                disabled={true}
              />
            </fieldset>

            <fieldset className="col-span-2">
              <DisplayInput
                labelContent={'Sexo'}
                placeholder={'Sexo do usuário'}
                nome={'sexo'}
                onChangeFunction={''}
                inputType={'text'}
                value={
                  user.userData.sexo === 'F'
                    ? 'Feminino'
                    : user.userData.sexo === 'M'
                      ? 'Masculino'
                      : ''
                }
                disabled={true}
              />
            </fieldset>

            <fieldset className="col-span-6">
              <DisplayInput
                labelContent={'Email'}
                placeholder={'Email do usuário'}
                nome={'emailUsuario'}
                onChangeFunction={''}
                inputType={'Email'}
                value={user.userData.email ?? ''}
                disabled={true}
              />
            </fieldset>

            <fieldset className="col-span-4">
              <DisplayInput
                labelContent={'Meta'}
                placeholder={'Meta do usuário'}
                nome={'metaUsuario'}
                onChangeFunction={''}
                inputType={'text'}
                value={formData.metaNome ?? ''}
                disabled={true}
              />
            </fieldset>

            <fieldset className="col-span-1">
              <DisplayInput
                labelContent={'Peso'}
                placeholder={'Peso'}
                nome={'pesoUsuario'}
                onChangeFunction={''}
                inputType={'text'}
                value={formData.peso ? `${formData.peso}kg` : ''}
                disabled={true}
              />
            </fieldset>

            <fieldset className="col-span-1">
              <DisplayInput
                labelContent={'Altura'}
                placeholder={'Altura'}
                nome={'AlturaUsuario'}
                onChangeFunction={''}
                inputType={'text'}
                value={formData.altura ? `${formData.altura}cm` : ''}
                disabled={true}
              />
            </fieldset>

            <fieldset className="col-span-6 grid auto-rows-auto grid-flow-row gap-y-2 h-full overflow-auto scrollbar-thin">
              <Checkbox
                disabled={true}
                labelStyle={'text-gray500 text-lg'}
                Id={'displayproblemasCardiacos'}
                checked={formData.problemasCardiacos == 1 ? true : false}
                labelcontent={
                  'Algum médico já disse que você possui algum problema de coração e que só deveria realizar atividade física supervisionado por profissionais de saúde?'
                }
              />

              <Checkbox
                disabled={true}
                labelStyle={'text-gray500 text-lg'}
                Id={'displayDorPeitoAtividade'}
                checked={formData.dorPeitoAtividade == 1 ? true : false}
                labelcontent={
                  'Você sente dores no peito quando pratica atividade física?'
                }
              />

              <Checkbox
                disabled={true}
                labelStyle={'text-gray500 text-lg'}
                Id={'displayDorPeitoUltimoMes'}
                checked={formData.dorPeitoUltimoMes == 1 ? true : false}
                labelcontent={
                  'No último mês, você sentiu dores no peito quando praticou atividade física?'
                }
              />

              <Checkbox
                disabled={true}
                labelStyle={'text-gray500 text-lg'}
                Id={'displayProblemaOsseoArticular'}
                checked={formData.problemaOsseoArticular == 1 ? true : false}
                labelcontent={
                  'Você possui algum problema ósseo ou articular que poderia ser piorado pela atividade física?'
                }
              />

              <Checkbox
                disabled={true}
                labelStyle={'text-gray500 text-lg'}
                Id={'displayMedicamentoPressaoCoracao'}
                checked={formData.medicamentoPressaoCoracao == 1 ? true : false}
                labelcontent={
                  'Você toma atualmente algum medicamento para pressão arterial e/ou problema de coração?'
                }
              />

              <Checkbox
                disabled={true}
                labelStyle={'text-gray500 text-lg'}
                Id={'displayImpedimentoAtividade'}
                checked={formData.impedimentoAtividade == 1 ? true : false}
                labelcontent={
                  'Sabe de alguma outra razão pela qual você não deve praticar atividade física?'
                }
              />
            </fieldset>

            <fieldset className="col-span-6 grid place-items-center">
              <Button
                content={splashActive ? <div className="animate-pulse rounded-full w-5 h-5 bg-white"></div> : "Concluir cadastro!"}
                variant={'accept'}
                iconVisibility={false}
                buttonStyle={
                  'text-gray100 bg-primary-green300 rounded-full font-bold px-10 py-4 hover:bg-primary-green400 transition-all flex items-center gap-1'
                }
                type={'submit'}
              />
            </fieldset>
          </form>
        </div>
      </div>
    </>
  );
}
