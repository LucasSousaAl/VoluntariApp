import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useApp } from "../../context/AppContext";
import { ong } from "../../data";
import { VagaStatus, Category, Vaga } from "../../models/types";
import { StatusBadge, ProgressBar } from "../../components/UI";
import { Navbar } from "../../components/Navbar";
import {
  Spin,
  message,
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  Popconfirm,
} from "antd";
import styles from "./style.module.css";

const { TextArea } = Input;
const { Option } = Select;

export default function ONGPage() {
  const router = useRouter();
  const { setSelectedVaga, currentUserRole, currentUser } = useApp();
  const [activeTab, setActiveTab] = useState<VagaStatus | "Todas">("Todas");
  const [ongData, setOngData] = useState<any>(null);
  const [ongVagas, setOngVagas] = useState<Vaga[]>([]);
  const [loading, setLoading] = useState(true);

  // Edit states
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editingVaga, setEditingVaga] = useState<Vaga | null>(null);
  const [form] = Form.useForm();

  // ONG Edit states
  const [isEditOngModalVisible, setIsEditOngModalVisible] = useState(false);
  const [ongForm] = Form.useForm();

  useEffect(() => {
    let isMounted = true;

    const fetchOngData = async () => {
      if (!currentUser) return;
      try {
        const response = await fetch("/api/v1/ong");
        const data = await response.json();

        if (response.ok && data.length > 0) {
          const currentOng =
            currentUser && currentUser.email
              ? data.find((o: any) => o.email === currentUser.email)
              : null;

          if (!currentOng) {
            if (isMounted) setLoading(false);
            return;
          }

          if (isMounted) setOngData(currentOng);

          const workResponse = await fetch(
            `/api/v1/trabalho?ong_id=${currentOng.id}`,
          );
          const workData = await workResponse.json();

          if (workResponse.ok && isMounted) {
            const mappedVagas: Vaga[] = workData.map((t: any) => ({
              id: t.id.toString(),
              title: t.titulo,
              ong: currentOng.nome,
              city: currentOng.localidade,
              category: (t.categoria as Category) || "Social",
              modality: "Híbrido",
              availability: t.disponibilidade || "Fins de semana",
              hoursPerWeek: t.carga_horaria?.toString() || "0",
              totalSlots: t.n_vagas || 0,
              filledSlots: 0,
              startDate: new Date(t.criado_em).toLocaleDateString("pt-BR"),
              description: t.descricao || "",
              requirements: [],
              icon:
                t.categoria === "Educação"
                  ? "📚"
                  : t.categoria === "Saúde"
                    ? "💚"
                    : t.categoria === "Meio Ambiente"
                      ? "🌱"
                      : "🤝",
              status: "Ativa",
            }));
            setOngVagas(mappedVagas);
          }
        } else if (data.length === 0) {
          message.info("Cadastre uma ONG primeiro.");
          router.push("/Register");
        } else {
          message.error("Erro ao buscar perfil da ONG");
        }
      } catch (error) {
        if (isMounted) message.error("Erro ao conectar com o banco de dados");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchOngData();

    return () => {
      isMounted = false;
    };
  }, [router, currentUser]);

  const handleDeleteOng = async () => {
    if (!ongData) return;
    try {
      const response = await fetch(`/api/v1/ong?id=${ongData.id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        message.success("ONG deletada com sucesso!");
        setTimeout(() => router.push("/Home"), 1500);
      } else {
        message.error("Erro ao deletar perfil da ONG.");
      }
    } catch (error) {
      message.error("Erro de conexão ao tentar deletar a ONG.");
    }
  };

  const showEditOngModal = () => {
    ongForm.setFieldsValue({
      nome: ongData.nome,
      localidade: ongData.localidade,
      telefone: ongData.telefone,
    });
    setIsEditOngModalVisible(true);
  };

  const handleEditOngComplete = async (values: any) => {
    if (!ongData) return;
    try {
      const payload = {
        id: ongData.id,
        nome: values.nome,
        localidade: values.localidade,
        telefone: values.telefone,
      };
      const response = await fetch(`/api/v1/ong`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        message.success("Perfil atualizado com sucesso!");
        setOngData({
          ...ongData,
          nome: values.nome,
          localidade: values.localidade,
          telefone: values.telefone,
        });
        setIsEditOngModalVisible(false);
      } else {
        message.error("Erro ao atualizar perfil.");
      }
    } catch (error) {
      message.error("Erro de conexão ao tentar atualizar o perfil.");
    }
  };

  const handleDelete = async (vagaId: string) => {
    try {
      const response = await fetch(`/api/v1/trabalho?id=${vagaId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        message.success("Vaga deletada com sucesso!");
        setOngVagas((prev) => prev.filter((v) => v.id !== vagaId));
      } else {
        message.error("Erro ao deletar vaga.");
      }
    } catch (error) {
      message.error("Erro de conexão ao tentar deletar.");
    }
  };

  const showEditModal = (vaga: Vaga) => {
    setEditingVaga(vaga);
    form.setFieldsValue({
      title: vaga.title,
      description: vaga.description,
      totalSlots: vaga.totalSlots,
      category: vaga.category,
      availability: vaga.availability,
      hoursPerWeek: vaga.hoursPerWeek,
    });
    setIsEditModalVisible(true);
  };

  const handleEditComplete = async (values: any) => {
    if (!editingVaga) return;

    try {
      const payload = {
        id: editingVaga.id,
        titulo: values.title,
        descricao: values.description,
        n_vagas: values.totalSlots,
        categoria: values.category,
        disponibilidade: values.availability,
        carga_horaria: parseInt(values.hoursPerWeek, 10) || 0,
      };

      const response = await fetch(`/api/v1/trabalho`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        message.success("Vaga atualizada com sucesso!");
        setOngVagas((prev) =>
          prev.map((v) =>
            v.id === editingVaga.id
              ? {
                  ...v,
                  title: values.title,
                  description: values.description,
                  totalSlots: values.totalSlots,
                  category: values.category,
                  availability: values.availability,
                  hoursPerWeek: values.hoursPerWeek,
                  icon:
                    values.category === "Educação"
                      ? "📚"
                      : values.category === "Saúde"
                        ? "💚"
                        : values.category === "Meio Ambiente"
                          ? "🌱"
                          : "🤝",
                }
              : v,
          ),
        );
        setIsEditModalVisible(false);
        setEditingVaga(null);
      } else {
        message.error("Erro ao atualizar vaga.");
      }
    } catch (error) {
      message.error("Erro de conexão ao tentar atualizar.");
    }
  };

  const filtered =
    activeTab === "Todas"
      ? ongVagas
      : ongVagas.filter((v) => v.status === activeTab);

  if (loading)
    return (
      <div
        className="flex justify-center items-center"
        style={{ height: "100vh" }}
      >
        <Spin size="large" />
      </div>
    );
  if (!ongData) return null;

  const isOwnerOrAdmin =
    currentUserRole === "ong" || currentUserRole === "admin";

  return (
    <div className="page page--cream">
      <Navbar />
      <div className="container container--wide">
        {/* Header */}
        <div className={`card--hero mb-28 ${styles.ong_header}`}>
          <div className={styles.ong_header_content}>
            <div className={styles.ong_header_avatar}>
              {ongData.nome?.charAt(0)}
            </div>
            <div className={styles.ong_header_info}>
              <div className={styles.ong_header_top}>
                <h1 className={`heading-serif mb-4 ${styles.ong_heading}`}>
                  {ongData.nome}
                </h1>
                {isOwnerOrAdmin && (
                  <div className={styles.ong_header_actions}>
                    <button
                      onClick={showEditOngModal}
                      className="btn btn--outline btn--sm"
                    >
                      Editar Perfil
                    </button>
                    <Popconfirm
                      title="Tem certeza que deseja deletar a ONG?"
                      onConfirm={handleDeleteOng}
                      okText="Sim"
                      cancelText="Não"
                    >
                      <button
                        className={`btn btn--outline btn--sm ${styles.btn_danger}`}
                      >
                        Excluir ONG
                      </button>
                    </Popconfirm>
                  </div>
                )}
              </div>
              <p className={styles.ong_header_subtitle}>
                {ongData.localidade} · {ongData.email} · {ongData.telefone}
              </p>
            </div>
          </div>
          <div className={styles.ong_stats}>
            {[
              { num: ongVagas.length, label: "Vagas ativas" },
              { num: ong.totalVolunteers, label: "Voluntários" },
            ].map((s) => (
              <div key={s.label} className={styles.ong_stat}>
                <div className={styles.ong_stat_number}>{s.num}</div>
                <div className={styles.ong_stat_label}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Toolbar */}
        <div className={styles.ong_toolbar}>
          <div className={styles.ong_tab_bar}>
            <div className={styles.ong_tab_bar_inner}>
              {(["Todas", "Ativa" /* , 'Pausada', 'Rascunho' */] as const).map(
                (tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`${styles.ong_tab_btn}${activeTab === tab ? ` ${styles.ong_tab_btn_active}` : ""}`}
                  >
                    {tab}
                  </button>
                ),
              )}
            </div>
          </div>
          {isOwnerOrAdmin && (
            <button
              onClick={() => router.push("/form")}
              className="btn btn--primary btn--sm"
            >
              + Nova Vaga
            </button>
          )}
        </div>

        {/* Vaga rows */}
        {filtered.length === 0 ? (
          <div className={styles.ong_empty}>
            Esta ONG ainda não criou nenhuma vaga no Banco de Dados.
          </div>
        ) : (
          filtered.map((vaga) => (
            <div key={vaga.id} className={styles.ong_row}>
              <div className={styles.ong_row_top}>
                <div className={styles.ong_row_icon}>{vaga.icon}</div>
                <StatusBadge status={vaga.status} />
                <div className={styles.ong_row_main}>
                  <div className={`heading-serif ${styles.ong_row_title}`}>
                    {vaga.title}
                  </div>
                  <div className={styles.ong_row_info}>
                    <span>📅 {vaga.availability}</span>
                    <span>⏱ {vaga.hoursPerWeek}/semana</span>
                    <span>📍 {vaga.modality}</span>
                  </div>
                </div>
              </div>

              <ProgressBar value={vaga.filledSlots} max={vaga.totalSlots} />

              <div className={styles.ong_row_actions}>
                {isOwnerOrAdmin && (
                  <>
                    <button
                      onClick={() => showEditModal(vaga)}
                      className="btn btn--outline btn--sm"
                    >
                      Editar
                    </button>
                    <Popconfirm
                      title="Realmente deletar essa vaga?"
                      onConfirm={() => handleDelete(vaga.id)}
                      okText="Sim"
                      cancelText="Não"
                    >
                      <button
                        className={`btn btn--outline btn--sm ${styles.btn_danger}`}
                      >
                        Deletar
                      </button>
                    </Popconfirm>
                  </>
                )}
                <button
                  onClick={() => {
                    setSelectedVaga(vaga);
                    router.push(`/vaga?id=${vaga.id}`);
                  }}
                  className="btn btn--primary btn--sm"
                >
                  {vaga.status === "Rascunho" ? "Publicar" : "Ver"}
                </button>
              </div>
            </div>
          ))
        )}

        {/* Add button */}
        {/* {isOwnerOrAdmin && (
                    <button onClick={() => router.push('/form')} className="btn--dashed">
                        + Criar nova vaga
                    </button>
                )} */}

        {/* Edit Vaga Modal */}
        <div className={styles.ong_modal}>
          <Modal
            title="Editar Vaga"
            open={isEditModalVisible}
            onCancel={() => {
              setIsEditModalVisible(false);
              setEditingVaga(null);
            }}
            onOk={() => form.submit()}
            okText="Salvar Alterações"
            cancelText="Cancelar"
          >
            <Form form={form} layout="vertical" onFinish={handleEditComplete}>
              <Form.Item
                name="title"
                label="Título da Vaga"
                rules={[{ required: true, message: "Campo obrigatório" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="description"
                label="Descrição"
                rules={[{ required: true, message: "Campo obrigatório" }]}
              >
                <TextArea rows={4} />
              </Form.Item>
              <Form.Item
                name="totalSlots"
                label="Número de vagas (Total)"
                rules={[{ required: true, message: "Campo obrigatório" }]}
              >
                <InputNumber min={1} style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item
                name="category"
                label="Categoria"
                rules={[{ required: true, message: "Campo obrigatório" }]}
              >
                <Select>
                  <Option value="Educação">Educação</Option>
                  <Option value="Saúde">Saúde</Option>
                  <Option value="Meio Ambiente">Meio Ambiente</Option>
                  <Option value="Social">Social</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="availability"
                label="Disponibilidade"
                rules={[{ required: true, message: "Campo obrigatório" }]}
              >
                <Input placeholder="Ex: Segunda a Sexta, Fins de semana" />
              </Form.Item>
              <Form.Item
                name="hoursPerWeek"
                label="Carga horária"
                rules={[{ required: true, message: "Campo obrigatório" }]}
              >
                <Input placeholder="Ex: 5h/semana" />
              </Form.Item>
            </Form>
          </Modal>
        </div>

        {/* Edit ONG Modal */}
        <div className={styles.ong_modal}>
          <Modal
            title="Editar Perfil da ONG"
            open={isEditOngModalVisible}
            onCancel={() => setIsEditOngModalVisible(false)}
            onOk={() => ongForm.submit()}
            okText="Salvar Alterações"
            cancelText="Cancelar"
          >
            <Form
              form={ongForm}
              layout="vertical"
              onFinish={handleEditOngComplete}
            >
              <Form.Item
                name="nome"
                label="Nome da ONG"
                rules={[{ required: true, message: "Campo obrigatório" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="localidade"
                label="Localidade"
                rules={[{ required: true, message: "Campo obrigatório" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="telefone"
                label="Telefone"
                rules={[{ required: true, message: "Campo obrigatório" }]}
              >
                <Input />
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </div>
    </div>
  );
}
